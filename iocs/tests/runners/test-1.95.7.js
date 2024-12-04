const { runTest } = require('../lib/test-harness');

async function main() {
    console.log("Testing @solana/web3.js v1.95.7...");
    const results = await runTest();
    
    if (results.errors.length > 0) {
        console.error("Test errors:", results.errors);
        process.exit(1);
    }

    console.log("Test results:", results);
    
    if (!results.keyGeneration || !results.accountCreation) {
        process.exit(1);
    }
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});     