const puppeteer = require('puppeteer');

class TestHarness {
  constructor(version) {
    this.version = version;
    this.networkCalls = [];
    this.results = {
      version,
      walletOperations: { calls: [], patterns: [] },
      transactionOperations: { calls: [], patterns: [] },
      durableOperations: { calls: [], patterns: [] }
    };
  }

  async runTests(web3js) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');
    await page.evaluate((version) => {
      window.version = version;
    }, this.version);

    this.mockFetch();
    await this.testWalletOperations(web3js, page);
    await this.testTransactionOperations(web3js, page);
    await this.testDurableOperations(web3js, page);
    await browser.close();
    return this.results;
  }

  mockFetch() {
    global.fetch = async (url, options) => {
      this.networkCalls.push({url, options, timestamp: Date.now()});
      return { ok: true, json: () => Promise.resolve({
        result: { value: { blockhash: 'simulated', feeCalculator: { lamportsPerSignature: 5000 } } }
      })};
    };
  }

  async testWalletOperations(web3js, page) {
    console.log(`Testing Wallet Operations - ${this.version}`);
    const startCalls = this.networkCalls.length;

    try {
      // Test wallet creation and key handling
      const wallet = await page.evaluate(() => window.web3.Keypair.generate());
      const connection = await page.evaluate(() => new window.web3.Connection(window.web3.clusterApiUrl('devnet')));
      
      // Test public key operations
      const pubKey = await page.evaluate(() => new window.web3.PublicKey(wallet.publicKey.toString()));
      await page.evaluate((pubKey) => window.connection.getBalance(pubKey), pubKey);

      // Test PDA derivation
      const [pda] = await page.evaluate(() => window.web3.PublicKey.findProgramAddress(
        [Buffer.from("test-seed")],
        pubKey
      ));

      this.results.walletOperations = {
        success: true,
        calls: this.networkCalls.slice(startCalls),
        patterns: this.detectSuspiciousPatterns(this.networkCalls.slice(startCalls))
      };
    } catch (error) {
      console.error("Wallet operations failed:", error);
      this.results.walletOperations.success = false;
    }
  }

  async testTransactionOperations(web3js, page) {
    console.log(`Testing Transaction Operations - ${this.version}`);
    const startCalls = this.networkCalls.length;

    try {
      const connection = await page.evaluate(() => new window.web3.Connection(window.web3.clusterApiUrl('devnet')));
      const payer = await page.evaluate(() => window.web3.Keypair.generate());
      const recipient = await page.evaluate(() => window.web3.Keypair.generate());

      // Create versioned transaction (new format)
      const latestBlockhash = await page.evaluate(() => window.connection.getLatestBlockhash());
      
      const transferInstruction = await page.evaluate(() => window.web3.SystemProgram.transfer({
        fromPubkey: payer.publicKey,
        toPubkey: recipient.publicKey,
        lamports: 1000,
      }));

      const messageV0 = await page.evaluate(() => new window.web3.TransactionMessage({
        payerKey: payer.publicKey,
        recentBlockhash: latestBlockhash.blockhash,
        instructions: [transferInstruction],
      }).compileToV0Message());

      const transaction = await page.evaluate(() => new window.web3.VersionedTransaction(messageV0));
      await page.evaluate(() => transaction.sign([payer]));

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

  async testDurableOperations(web3js, page) {
    console.log(`Testing Durable Operations - ${this.version}`);
    const startCalls = this.networkCalls.length;

    try {
      const connection = await page.evaluate(() => new window.web3.Connection(window.web3.clusterApiUrl('devnet')));
      const wallet = await page.evaluate(() => window.web3.Keypair.generate());
      const nonceAccount = await page.evaluate(() => window.web3.Keypair.generate());

      // Create nonce account instruction
      const createNonceAccountIx = await page.evaluate(() => window.web3.SystemProgram.createNonceAccount({
        fromPubkey: wallet.publicKey,
        noncePubkey: nonceAccount.publicKey,
        authorizedPubkey: wallet.publicKey,
        lamports: await connection.getMinimumBalanceForRentExemption(web3js.NONCE_ACCOUNT_LENGTH),
      }));

      // Create durable transaction
      const advanceNonceIx = await page.evaluate(() => window.web3.SystemProgram.nonceAdvance({
        noncePubkey: nonceAccount.publicKey,
        authorizedPubkey: wallet.publicKey
      }));

      this.results.durableOperations = {
        success: true,
        calls: this.networkCalls.slice(startCalls),
        patterns: this.detectSuspiciousPatterns(this.networkCalls.slice(startCalls))
      };
    } catch (error) {
      console.error("Durable operations failed:", error);
      this.results.durableOperations.success = false;
    }
  }

  detectSuspiciousPatterns(calls) {
    return calls.filter(call => {
      const headers = call.options?.headers || {};
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