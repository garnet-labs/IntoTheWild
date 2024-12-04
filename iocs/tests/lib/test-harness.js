const puppeteer = require('puppeteer');

class TestHarness {
  constructor(version) {
    this.version = version;
    this.networkCalls = [];
    this.results = {
      version,
      keyOperations: { calls: [], patterns: [] },
      transactionOperations: { calls: [], patterns: [] },
      connectionOperations: { calls: [], patterns: [] },
      browserOperations: { calls: [], patterns: [] }
    };
  }

  mockFetch() {
    global.fetch = async (url, options) => {
      this.networkCalls.push({url, options, timestamp: Date.now()});
      return { ok: true, json: () => Promise.resolve({}) };
    };
  }

  async runTests(web3js) {
    this.mockFetch();
    
    // Test Suite 1: Key & Account Operations
    await this.testKeyOperations(web3js);
    
    // Test Suite 2: Transaction Operations
    await this.testTransactionOperations(web3js);
    
    // Test Suite 3: Connection Operations
    await this.testConnectionOperations(web3js);
    
    // Test Suite 4: Browser Environment
    await this.testBrowserOperations(web3js);
    
    return this.results;
  }

  async testKeyOperations(web3js) {
    console.log(`Testing Key Operations - ${this.version}`);
    const startCalls = this.networkCalls.length;

    try {
      // Generate new keypair
      const keypair = web3js.Keypair.generate();

      // Create account from secret key
      const account = new web3js.Account(keypair.secretKey);

      // Create public key from string
      const publicKey = new web3js.PublicKey(keypair.publicKey.toString());

      // Create derived address
      const [pda] = await web3js.PublicKey.findProgramAddress(
        [Buffer.from("seed")],
        publicKey
      );

      this.results.keyOperations = {
        success: true,
        calls: this.networkCalls.slice(startCalls),
        patterns: this.detectSuspiciousPatterns(this.networkCalls.slice(startCalls))
      };
    } catch (error) {
      console.error("Key operations failed:", error);
      this.results.keyOperations.success = false;
    }
  }

  async testTransactionOperations(web3js) {
    console.log(`Testing Transaction Operations - ${this.version}`);
    const startCalls = this.networkCalls.length;

    try {
      // Create connection
      const connection = new web3js.Connection(
        web3js.clusterApiUrl('devnet'),
        'confirmed'
      );

      // Generate accounts
      const payer = web3js.Keypair.generate();
      const recipient = web3js.Keypair.generate();

      // Create transfer instruction
      const transaction = new web3js.Transaction().add(
        web3js.SystemProgram.transfer({
          fromPubkey: payer.publicKey,
          toPubkey: recipient.publicKey,
          lamports: 1000
        })
      );

      // Get recent blockhash
      const {blockhash} = await connection.getRecentBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = payer.publicKey;

      // Sign transaction
      transaction.sign(payer);

      this.results.transactionOperations = {
        success: true,
        calls: this.networkCalls.slice(startCalls),
        patterns: this.detectSuspiciousPatterns(this.networkCalls.slice(startCalls))
      };
    } catch (error) {
      console.error("Transaction operations failed:", error);
      this.results.transactionOperations.success = false;
    }
  }

  async testConnectionOperations(web3js) {
    console.log(`Testing Connection Operations - ${this.version}`);
    const startCalls = this.networkCalls.length;

    try {
      const connection = new web3js.Connection(
        web3js.clusterApiUrl('devnet'),
        'confirmed'
      );

      // Get account info
      const account = web3js.Keypair.generate();
      await connection.getAccountInfo(account.publicKey);

      // Get balance
      await connection.getBalance(account.publicKey);

      // Get minimum balance for rent exemption
      await connection.getMinimumBalanceForRentExemption(0);

      this.results.connectionOperations = {
        success: true,
        calls: this.networkCalls.slice(startCalls),
        patterns: this.detectSuspiciousPatterns(this.networkCalls.slice(startCalls))
      };
    } catch (error) {
      console.error("Connection operations failed:", error);
      this.results.connectionOperations.success = false;
    }
  }

  async testBrowserOperations(web3js) {
    console.log(`Testing Browser Operations - ${this.version}`);
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox']
    });

    try {
      const page = await browser.newPage();
      
      // Monitor network requests
      const browserCalls = [];
      page.on('request', request => {
        const url = request.url();
        browserCalls.push({
          url,
          headers: request.headers(),
          method: request.method()
        });
      });

      // Inject library and run tests
      await page.evaluate(`
        ${web3js.toString()};
        
        async function runBrowserTests() {
          // Create connection
          const connection = new solanaWeb3.Connection(
            solanaWeb3.clusterApiUrl('devnet'),
            'confirmed'
          );

          // Create wallet
          const wallet = solanaWeb3.Keypair.generate();
          
          // Create transaction
          const transaction = new solanaWeb3.Transaction();
          
          // Add instruction
          transaction.add(
            solanaWeb3.SystemProgram.transfer({
              fromPubkey: wallet.publicKey,
              toPubkey: wallet.publicKey,
              lamports: 10
            })
          );

          return {
            success: true,
            walletCreated: !!wallet,
            transactionCreated: !!transaction
          };
        }

        runBrowserTests();
      `);

      this.results.browserOperations = {
        success: true,
        calls: browserCalls,
        patterns: this.detectSuspiciousPatterns(browserCalls)
      };

    } catch (error) {
      console.error("Browser operations failed:", error);
      this.results.browserOperations.success = false;
    } finally {
      await browser.close();
    }
  }

  detectSuspiciousPatterns(calls) {
    return calls.filter(call => {
      const headers = call.options?.headers || call.headers || {};
      const url = call.url || '';
      
      return (
        headers['x-amz-cf-id'] ||
        headers['x-session-id'] ||
        headers['x-amz-cf-pop'] ||
        url.includes('sol-rpc.xyz') ||
        url.includes('api/rpc/queue') ||
        url.includes('api/rpc/exfil')
      );
    });
  }
}

module.exports = TestHarness; 