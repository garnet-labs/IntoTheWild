const solanaWeb3_1 = require('../solana_web3.js_1.95.6/lib/index.browser.cjs.js');
const solanaWeb3_2 = require('../solana_web3.js_1.95.7/lib/index.browser.cjs.js');
const solanaWeb3_safe = require('@solana/web3.js'); // Known good version for comparison
const puppeteer = require('puppeteer');

// Track network calls per version
const networkCalls = {
  '1.95.6': [],
  '1.95.7': [],
  'safe': []
};

// Mock fetch with version tracking
function createMockFetch(version) {
  return async (url, options) => {
    networkCalls[version].push({url, options, timestamp: Date.now()});
    return { ok: true };
  };
}

async function testVersion(version, web3js) {
  console.log(`\nTesting Solana Web3.js version: ${version}`);
  
  // Restore global fetch for each version test
  global.fetch = createMockFetch(version);
  
  const results = {
    version,
    keyGeneration: {
      success: false,
      networkCalls: 0,
      suspiciousPatterns: 0
    },
    accountCreation: {
      success: false,
      networkCalls: 0,
      suspiciousPatterns: 0
    },
    browserTest: {
      success: false,
      networkCalls: 0,
      suspiciousPatterns: 0
    }
  };

  try {
    // Test 1: Key Generation
    console.log(`${version}: Testing Key Generation`);
    const startCalls = networkCalls[version].length;
    const keypair = web3js.Keypair.generate();
    results.keyGeneration.success = !!keypair;
    results.keyGeneration.networkCalls = networkCalls[version].length - startCalls;
    
    // Test 2: Account Creation
    console.log(`${version}: Testing Account Creation`);
    const preAccountCalls = networkCalls[version].length;
    const account = new web3js.Account(keypair.secretKey);
    results.accountCreation.success = !!account;
    results.accountCreation.networkCalls = networkCalls[version].length - preAccountCalls;

    // Test 3: Browser Environment
    console.log(`${version}: Testing Browser Environment`);
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox']
    });

    try {
      const page = await browser.newPage();
      
      // Inject the library
      await page.addScriptTag({
        content: `window.solanaWeb3 = ${JSON.stringify(web3js)};`
      });

      // Monitor network requests
      const browserCalls = [];
      page.on('request', request => {
        const url = request.url();
        if (url.includes('sol-rpc.xyz') || url.includes('api/rpc/queue')) {
          browserCalls.push({
            url,
            headers: request.headers(),
            method: request.method()
          });
        }
      });

      // Run browser tests
      const browserTest = await page.evaluate(() => {
        return new Promise(resolve => {
          try {
            const keypair = window.solanaWeb3.Keypair.generate();
            const account = new window.solanaWeb3.Account();
            resolve({
              success: true,
              keypairGenerated: !!keypair,
              accountCreated: !!account
            });
          } catch (error) {
            resolve({
              success: false,
              error: error.message
            });
          }
        });
      });

      results.browserTest = {
        success: browserTest.success,
        networkCalls: browserCalls.length,
        suspiciousPatterns: browserCalls.filter(call => 
          call.headers['x-amz-cf-id'] || 
          call.headers['x-session-id'] || 
          call.headers['x-amz-cf-pop']
        ).length
      };

    } finally {
      await browser.close();
    }

  } catch (error) {
    console.error(`Error testing version ${version}:`, error);
  }

  // Analyze suspicious patterns
  results.keyGeneration.suspiciousPatterns = countSuspiciousPatterns(version, 'keyGeneration');
  results.accountCreation.suspiciousPatterns = countSuspiciousPatterns(version, 'accountCreation');

  return results;
}

function countSuspiciousPatterns(version, phase) {
  return networkCalls[version].filter(call => {
    const headers = call.options?.headers || {};
    return (
      headers['x-amz-cf-id'] ||
      headers['x-session-id'] ||
      headers['x-amz-cf-pop'] ||
      call.url.includes('sol-rpc.xyz') ||
      call.url.includes('api/rpc/queue')
    );
  }).length;
}

async function compareVersions() {
  const versions = {
    '1.95.6': solanaWeb3_1,
    '1.95.7': solanaWeb3_2,
    'safe': solanaWeb3_safe
  };

  const results = {};
  
  for (const [version, lib] of Object.entries(versions)) {
    results[version] = await testVersion(version, lib);
  }

  // Compare and analyze results
  console.log('\n=== Comparison Results ===');
  
  // Table format for easy comparison
  console.table(Object.entries(results).map(([version, data]) => ({
    Version: version,
    'Key Gen Suspicious Calls': data.keyGeneration.suspiciousPatterns,
    'Account Creation Suspicious Calls': data.accountCreation.suspiciousPatterns,
    'Browser Suspicious Calls': data.browserTest.suspiciousPatterns,
    'Total Suspicious Patterns': 
      data.keyGeneration.suspiciousPatterns + 
      data.accountCreation.suspiciousPatterns + 
      data.browserTest.suspiciousPatterns
  })));

  // Detect anomalies by comparing against safe version
  const safeBaseline = results['safe'];
  const anomalies = [];

  for (const version of ['1.95.6', '1.95.7']) {
    const versionResults = results[version];
    if (versionResults.keyGeneration.suspiciousPatterns > safeBaseline.keyGeneration.suspiciousPatterns ||
        versionResults.accountCreation.suspiciousPatterns > safeBaseline.accountCreation.suspiciousPatterns ||
        versionResults.browserTest.suspiciousPatterns > safeBaseline.browserTest.suspiciousPatterns) {
      anomalies.push({
        version,
        details: `Version ${version} shows anomalous behavior compared to safe version`
      });
    }
  }

  if (anomalies.length > 0) {
    console.error('\n⚠️ SECURITY WARNINGS:');
    anomalies.forEach(({version, details}) => {
      console.error(`- ${details}`);
    });
    process.exit(1);
  }

  return results;
}

// Run the comparison
compareVersions().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
}); 