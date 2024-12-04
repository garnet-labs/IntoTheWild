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
                    results[phase].networkCalls.push({
                        type: 'suspicious_header',
                        header: header,
                        value: headers[header]
                    });
                    results[phase].suspiciousPatterns++;
                }
            }
            
            request.continue();
        });

        // Test scenarios that might trigger suspicious behavior
        const testResults = await page.evaluate(async () => {
            const results = {
                keyGeneration: { success: false, calls: [] },
                accountCreation: { success: false, calls: [] },
                errors: []
            };

            try {
                // Test Keypair generation
                results.currentPhase = 'keyGeneration';
                const keypair = solana.Keypair.generate();
                results.keyGeneration.success = true;

                // Test Account creation (known to potentially trigger suspicious behavior)
                results.currentPhase = 'accountCreation';
                const account = new solana.Account();
                results.accountCreation.success = true;

                // Test fromSecretKey (another potential trigger)
                const secretKey = new Uint8Array(64).fill(1);
                const keypairFromSecret = solana.Keypair.fromSecretKey(secretKey);

            } catch (error) {
                results.errors.push(error.message);
            }

            return results;
        });

        // Merge browser test results
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