const TestHarness = require('../lib/test-harness');
const web3js = require('@solana/web3.js');

async function runTest() {
  const harness = new TestHarness('safe');
  const results = await harness.runTests(web3js);
  
  // Save results as artifact
  require('fs').writeFileSync(
    './test-results-safe.json', 
    JSON.stringify(results, null, 2)
  );
}

runTest().catch(console.error); 