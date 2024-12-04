const TestHarness = require('../lib/test-harness');
const web3js = require('@solana/web3.js');

async function runTest() {
  const harness = new TestHarness('safe');
  const results = await harness.runTests(web3js);
}

runTest().catch(console.error); 