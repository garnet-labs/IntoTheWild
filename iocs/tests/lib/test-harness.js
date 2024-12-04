const puppeteer = require('puppeteer');

async function runTest() {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox']
    });

    const results = {
        keyGeneration: {
            suspiciousPatterns: 0,
            success: false,
            networkCalls: [],
            headers: []
        },
        accountCreation: {
            suspiciousPatterns: 0,
            success: false,
            networkCalls: [],
            headers: []
        },
        errors: []
    };

    try {
        const page = await browser.newPage();

        // Monitor all network requests
        await page.setRequestInterception(true);
        
        page.on('request', request => {
            const url = request.url();
            const headers = request.headers();
            const phase = results.currentPhase || 'unknown';
            
            // Track suspicious URLs and headers
            if (url.includes('sol-rpc.xyz') || url.includes('api/rpc/queue')) {
                results[phase].suspiciousPatterns++;
                results[phase].networkCalls.push({
                    url,
                    method: request.method(),
                    headers
                });
            }

            // Track any headers that might contain encoded data
            const suspiciousHeaders = [
                'x-amz-cf-id',
                'x-session-id',
                'x-amz-cf-pop',
                'x-queue-id',
                'x-trace'
            ];

            for (const header of suspiciousHeaders) {
                if (headers[header]) {
                    results[phase].headers.push({
                        name: header,
                        value: headers[header]
                    });
                    results[phase].suspiciousPatterns++;
                }
            }
            
            request.continue();
        });

        // Inject test wallet application code
        await page.evaluate(() => {
            // Mock wallet application environment
            window.walletApp = {
                async createWallet() {
                    const { Account, Keypair } = window.solanaWeb3;
                    
                    // Simulate real wallet creation flow
                    const account = new Account();
                    console.log("Account created:", account._publicKey);
                    
                    const keypair = Keypair.generate();
                    console.log("Keypair generated:", keypair.publicKey.toBase58());
                    
                    return {
                        account,
                        keypair
                    };
                }
            };
        });

        // Inject the web3.js library
        await page.addScriptTag({
            path: require.resolve('@solana/web3.js')
        });

        // Execute wallet application test scenario
        const testResults = await page.evaluate(async () => {
            const results = {
                keyGeneration: { success: false, calls: [] },
                accountCreation: { success: false, calls: [] },
                errors: []
            };

            try {
                // Test Account creation first (as a wallet would)
                results.currentPhase = 'accountCreation';
                const account = new window.solanaWeb3.Account();
                results.accountCreation.success = !!account._publicKey;

                // Test Keypair generation (common wallet operation)
                results.currentPhase = 'keyGeneration';
                const keypair = window.solanaWeb3.Keypair.generate();
                results.keyGeneration.success = !!keypair.publicKey;

                // Additional wallet operations that might trigger suspicious behavior
                const secretKey = new Uint8Array(64).fill(1);
                window.solanaWeb3.Keypair.fromSecretKey(secretKey);

            } catch (error) {
                results.errors.push(error.message);
            }

            return results;
        });

        // Merge results
        Object.assign(results.keyGeneration, testResults.keyGeneration);
        Object.assign(results.accountCreation, testResults.accountCreation);
        results.errors.push(...testResults.errors);

    } catch (error) {
        results.errors.push(error.message);
    } finally {
        await browser.close();
    }

    return results;
}

module.exports = { runTest }; 