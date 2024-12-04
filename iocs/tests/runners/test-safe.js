const { runTest } = require('../lib/test-harness');

async function main() {
    console.log("Testing @solana/web3.js v1.95.8 (safe version)...");
    const results = await runTest();
    
    if (results.errors.length > 0) {
        console.error("Test errors:", results.errors);
    }

    // Log suspicious network activity
    if (results.keyGeneration.suspiciousPatterns > 0 || 
        results.accountCreation.suspiciousPatterns > 0) {
        console.error("\n🚨 SUSPICIOUS NETWORK ACTIVITY DETECTED 🚨");
        
        if (results.keyGeneration.networkCalls.length > 0) {
            console.error("\nSuspicious calls during key generation:");
            console.error(results.keyGeneration.networkCalls);
        }
        
        if (results.accountCreation.networkCalls.length > 0) {
            console.error("\nSuspicious calls during account creation:");
            console.error(results.accountCreation.networkCalls);
        }
        
        process.exit(1);
    }

    console.log("\nTest completed successfully");
}

main().catch(err => {
    console.error(err);
    process.exit(1);
}); 