const TestHarness = require('../lib/test-harness');
const web3js = require('../../solana_web3.js_1.95.6/lib/index.browser.cjs.js');

async function runTest() {
  const harness = new TestHarness('1.95.6');
  const results = await harness.runTests(web3js);
  
  // Save results as artifact
  require('fs').writeFileSync(
    './test-results-1.95.6.json', 
    JSON.stringify(results, null, 2)
  );
}

runTest().catch(console.error); 