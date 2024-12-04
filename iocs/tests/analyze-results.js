async function analyzeResults() {
  const results = {
    '1.95.6': require('../test-results/test-results-1.95.6.json'),
    '1.95.7': require('../test-results/test-results-1.95.7.json'),
    'safe': require('../test-results/test-results-safe.json')
  };

  // Compare results and detect anomalies
  const analysis = compareResults(results);
  
  // Generate summary
  const summary = generateSummary(analysis);
  
  // Save summary
  require('fs').writeFileSync(
    './test-results/summary.json',
    JSON.stringify(summary, null, 2)
  );

  // Exit with error if anomalies found
  if (analysis.anomalies.length > 0) {
    process.exit(1);
  }
}

analyzeResults().catch(console.error); 