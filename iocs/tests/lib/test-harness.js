const puppeteer = require('puppeteer');

async function runTest() {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox']
    });

    const results = {
        keyGeneration: {
            suspiciousPatterns: 0,
            networkCalls: [],
            success: false
        },
        accountCreation: {
            suspiciousPatterns: 0,
            networkCalls: [],
            success: false
        },
        currentPhase: null,
        errors: []
    };

    try {
        const page = await browser.newPage();

        // Monitor all network requests before doing anything else
        await page.setRequestInterception(true);
        
        page.on('request', request => {
            const url = request.url();
            const headers = request.headers();
            
            // Track suspicious URLs and headers
            if (url.includes('sol-rpc.xyz') || url.includes('api/rpc/queue')) {
                console.log(`Suspicious URL detected: ${url}`);
                results[results.currentPhase].suspiciousPatterns++;
                results[results.currentPhase].networkCalls.push({
                    url,
                    method: request.method(),
                    headers,
                    phase: results.currentPhase
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
                    console.log(`Suspicious header detected: ${header}`);
                    results[results.currentPhase].networkCalls.push({
                        type: 'suspicious_header',
                        header: header,
                        value: headers[header],
                        phase: results.currentPhase
                    });
                    results[results.currentPhase].suspiciousPatterns++;
                }
            }
            
            request.continue();
        });

        // Inject the library into browser context
        await page.addScriptTag({
            path: require.resolve('@solana/web3.js'),
            type: 'text/javascript'
        });

        // Make sure library is available in browser context
        await page.evaluate(() => {
            window.solana = window.solanaWeb3;
        });

        // Execute test scenarios
        results.currentPhase = 'keyGeneration';
        await page.evaluate(() => {
            const keypair = new solana.Keypair();
            return keypair.publicKey.toBase58();
        });

        results.currentPhase = 'accountCreation';
        await page.evaluate(() => {
            const account = new solana.Account();
            return account.publicKey.toBase58();
        });

        // Test additional scenarios that might trigger malicious behavior
        await page.evaluate(() => {
            const secretKey = new Uint8Array(64).fill(1);
            const keypairFromSecret = solana.Keypair.fromSecretKey(secretKey);
            return keypairFromSecret.publicKey.toBase58();
        });

    } catch (error) {
        results.errors.push(error.message);
        console.error('Test error:', error);
    } finally {
        await browser.close();
    }

    // Log final results
    console.log('Test Results:', {
        keyGeneration: {
            suspiciousPatterns: results.keyGeneration.suspiciousPatterns,
            networkCalls: results.keyGeneration.networkCalls.length
        },
        accountCreation: {
            suspiciousPatterns: results.accountCreation.suspiciousPatterns,
            networkCalls: results.accountCreation.networkCalls.length
        },
        errors: results.errors
    });

    return results;
}

module.exports = { runTest }; 