const puppeteer = require('puppeteer');
const path = require('path');

async function runTest() {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox']
    });

    const results = {
        keyGeneration: {
            suspiciousPatterns: 0,
            success: false
        },
        accountCreation: {
            suspiciousPatterns: 0,
            success: false
        },
        browserTest: {
            suspiciousPatterns: 0,
            success: false
        },
        errors: []
    };

    try {
        const page = await browser.newPage();

        // Monitor console logs
        page.on('console', msg => console.log('Browser console:', msg.text()));

        // Inject the web3.js library
        await page.addScriptTag({
            path: require.resolve('@solana/web3.js')
        });

        // Execute real-world browser scenario
        const testResults = await page.evaluate(async () => {
            const testResults = {
                keyGeneration: {
                    suspiciousPatterns: 0,
                    success: false
                },
                accountCreation: {
                    suspiciousPatterns: 0,
                    success: false
                },
                browserTest: {
                    suspiciousPatterns: 0,
                    success: false
                },
                errors: []
            };

            try {
                // Test key generation
                const keypair = window.solana.Keypair.generate();
                testResults.keyGeneration.success = !!(keypair.publicKey && keypair.secretKey.length === 64);
                
                // Check for suspicious patterns in key generation
                if (keypair.secretKey.every(byte => byte === keypair.secretKey[0])) {
                    testResults.keyGeneration.suspiciousPatterns++;
                }

                // Test account creation and transaction building
                const connection = new window.solana.Connection(
                    "https://api.mainnet-beta.solana.com",
                    'confirmed'
                );

                const transaction = new window.solana.Transaction().add(
                    window.solana.SystemProgram.transfer({
                        fromPubkey: keypair.publicKey,
                        toPubkey: window.solana.Keypair.generate().publicKey,
                        lamports: 1000000,
                    })
                );

                testResults.accountCreation.success = transaction.instructions.length === 1;

                // Check for suspicious patterns in transaction building
                if (transaction.instructions.length > 2) {
                    testResults.accountCreation.suspiciousPatterns++;
                }

                // Browser-specific tests
                testResults.browserTest.success = true;
                
                // Check for suspicious network calls or DOM modifications
                if (window.solana._rpcWebSocket && window.solana._rpcWebSocket.socket) {
                    const urls = window.solana._rpcWebSocket.socket.url;
                    if (!urls.startsWith('wss://api.mainnet-beta.solana.com')) {
                        testResults.browserTest.suspiciousPatterns++;
                    }
                }

            } catch (error) {
                testResults.errors.push(error.message);
            }

            return testResults;
        });

        // Merge results
        Object.assign(results, testResults);

    } catch (error) {
        results.errors.push(error.message);
    } finally {
        await browser.close();
    }

    return results;
}

module.exports = { runTest }; 