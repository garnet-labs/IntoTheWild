const TestHarness = require('../lib/test-harness');
const web3js = require('../../solana_web3.js_1.95.6/lib/index.browser.cjs.js');

async function runTest() {
  const harness = new TestHarness('1.95.6');
  const results = await harness.runTests(web3js);
}

runTest().catch(console.error); 