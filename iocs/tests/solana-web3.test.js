const solanaWeb3_1 = require('../solana_web3.js_1.95.6/lib/index.browser.cjs.js');
const solanaWeb3_2 = require('../solana_web3.js_1.95.7/lib/index.browser.cjs.js');
const puppeteer = require('puppeteer');

// Mock fetch to detect suspicious network calls
const mockFetchCalls = [];
global.fetch = async (url, options) => {
  mockFetchCalls.push({url, options});
  return { ok: true };
};

async function testSuspiciousBehavior() {
  console.log('Testing for suspicious behavior...');
  
  // Test Case 1: Monitor private key generation
  console.log('\nTest Case 1: Private Key Generation');
  const keypair1 = solanaWeb3_1.Keypair.generate();
  const keypair2 = solanaWeb3_2.Keypair.generate();
  
  // Check for suspicious network calls after key generation
  console.log('Checking network calls after key generation...');
  console.log('Suspicious calls:', mockFetchCalls.filter(call => 
    call.url.includes('sol-rpc.xyz') || 
    call.url.includes('api/rpc/queue')
  ));

  // Test Case 2: Account Creation with Existing Keys
  console.log('\nTest Case 2: Account Creation');
  const account1 = new solanaWeb3_1.Account(keypair1.secretKey);
  const account2 = new solanaWeb3_2.Account(keypair2.secretKey);

  // Test Case 3: Browser Environment Simulation
  console.log('\nTest Case 3: Browser Environment Test');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox']
  });
  
  try {
    const page = await browser.newPage();

    // Monitor network requests
    page.on('request', request => {
      const url = request.url();
      if (url.includes('sol-rpc.xyz') || url.includes('api/rpc/queue')) {
        console.log('Suspicious browser network request detected:', {
          url: url,
          headers: request.headers(),
          method: request.method()
        });
      }
    });

    // Inject and test the libraries in browser context
    await page.evaluate(() => {
      // Mock window.crypto for key generation
      window.crypto = {
        getRandomValues: arr => arr.map(() => Math.floor(Math.random() * 256))
      };
      
      return new Promise(resolve => {
        try {
          // Test key generation in browser
          const keypair = solanaWeb3.Keypair.generate();
          const account = new solanaWeb3.Account();
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

  } finally {
    await browser.close();
  }

  // Analysis of findings
  console.log('\nAnalysis Results:');
  console.log('Total suspicious network calls:', mockFetchCalls.length);
  console.log('Unique endpoints contacted:', 
    [...new Set(mockFetchCalls.map(call => call.url))]
  );
  
  // Check for key exfiltration patterns
  const suspiciousPatterns = mockFetchCalls.filter(call => {
    const headers = call.options?.headers || {};
    return (
      headers['x-amz-cf-id'] || // Fake CloudFront headers
      headers['x-session-id'] || // Session tracking
      headers['x-amz-cf-pop']    // Location tracking
    );
  });

  if (suspiciousPatterns.length > 0) {
    console.error('WARNING: Detected potential key exfiltration attempts!');
    console.error('Suspicious patterns found:', suspiciousPatterns.length);
  }
}

// Run the test
testSuspiciousBehavior().then(() => {
  console.log('Test completed');
}).catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
}); 