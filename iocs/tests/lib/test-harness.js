const puppeteer = require('puppeteer');
const path = require('path');

async function runTest() {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox']
    });

    const results = {
        keyGeneration: false,
        transactionCreation: false,
        walletConnection: false,
        errors: []
    };

    try {
        const page = await browser.newPage();

        // Inject the web3.js library
        await page.addScriptTag({
            path: require.resolve('@solana/web3.js')
        });

        // Execute real-world browser scenario
        const testResults = await page.evaluate(async () => {
            const testResults = {
                keyGeneration: false,
                transactionCreation: false,
                walletConnection: false,
                errors: []
            };

            try {
                // Simulate wallet connection like Phantom would do
                const connection = new solanaWeb3.Connection(
                    "https://api.mainnet-beta.solana.com",
                    'confirmed'
                );

                // Test key generation (common wallet operation)
                const wallet = solanaWeb3.Keypair.generate();
                testResults.keyGeneration = wallet.publicKey && wallet.secretKey.length === 64;

                // Test transaction building (common dApp operation)
                const transaction = new solanaWeb3.Transaction().add(
                    solanaWeb3.SystemProgram.transfer({
                        fromPubkey: wallet.publicKey,
                        toPubkey: solanaWeb3.Keypair.generate().publicKey,
                        lamports: 1000000,
                    })
                );

                testResults.transactionCreation = transaction.instructions.length === 1;

                // Test connection & network interaction
                const balance = await connection.getBalance(wallet.publicKey);
                testResults.walletConnection = typeof balance === 'number';

            } catch (error) {
                testResults.errors.push(error.message);
            }

            return testResults;
        });

        results.keyGeneration = testResults.keyGeneration;
        results.transactionCreation = testResults.transactionCreation;
        results.walletConnection = testResults.walletConnection;
        results.errors = testResults.errors;

    } catch (error) {
        results.errors.push(error.message);
    } finally {
        await browser.close();
    }

    return results;
}

module.exports = { runTest }; 