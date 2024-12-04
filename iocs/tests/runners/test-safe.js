const { runTest } = require('../lib/test-harness');

async function main() {
    console.log("Testing @solana/web3.js v1.95.8 (safe version)...");
    const results = await runTest();
    
    if (results.errors.length > 0) {
        console.error("Test errors:", results.errors);
        process.exit(1);
    }

    console.log("Test results:", JSON.stringify(results, null, 2));
    
    // Check for success and suspicious patterns
    const hasFailures = !results.keyGeneration.success || 
                       !results.accountCreation.success || 
                       !results.browserTest.success;
                       
    const hasSuspiciousPatterns = results.keyGeneration.suspiciousPatterns > 0 || 
                                 results.accountCreation.suspiciousPatterns > 0 ||
                                 results.browserTest.suspiciousPatterns > 0;

    if (hasFailures || hasSuspiciousPatterns) {
        process.exit(1);
    }
}

main().catch(err => {
    console.error(err);
    process.exit(1);
}); 