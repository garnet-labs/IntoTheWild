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

  mockFetch() {
    global.fetch = async (url, options) => {
      this.networkCalls.push({url, options, timestamp: Date.now()});
      return { ok: true, json: () => Promise.resolve({
        result: { value: { blockhash: 'simulated', feeCalculator: { lamportsPerSignature: 5000 } } }
      })};
    };
  }

  async runTests(web3js) {
    this.mockFetch();
    await this.testWalletOperations(web3js);
    await this.testTransactionOperations(web3js);
    await this.testDurableOperations(web3js);
    return this.results;
  }

  async testWalletOperations(web3js) {
    console.log(`Testing Wallet Operations - ${this.version}`);
    const startCalls = this.networkCalls.length;

    try {
      const connection = new web3js.Connection(web3js.clusterApiUrl('devnet'));
      const wallet = web3js.Keypair.generate();
      const pubKey = new web3js.PublicKey(wallet.publicKey.toString());
      
      // Get balance
      await connection.getBalance(pubKey);

      // Test PDA derivation
      const [pda] = await web3js.PublicKey.findProgramAddress(
        [Buffer.from("test-seed")],
        pubKey
      );

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

  async testTransactionOperations(web3js) {
    console.log(`Testing Transaction Operations - ${this.version}`);
    const startCalls = this.networkCalls.length;

    try {
      const connection = new web3js.Connection(web3js.clusterApiUrl('devnet'));
      const payer = web3js.Keypair.generate();
      const recipient = web3js.Keypair.generate();

      // Get recent blockhash first
      const { blockhash } = await connection.getRecentBlockhash();
      
      // Create transfer instruction
      const transferInstruction = web3js.SystemProgram.transfer({
        fromPubkey: payer.publicKey,
        toPubkey: recipient.publicKey,
        lamports: 1000,
      });

      // Create transaction
      const transaction = new web3js.Transaction();
      transaction.add(transferInstruction);
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

  async testDurableOperations(web3js) {
    console.log(`Testing Durable Operations - ${this.version}`);
    const startCalls = this.networkCalls.length;

    try {
      const connection = new web3js.Connection(web3js.clusterApiUrl('devnet'));
      const wallet = web3js.Keypair.generate();
      const nonceAccount = web3js.Keypair.generate();

      // Get minimum balance first
      const minBalance = await connection.getMinimumBalanceForRentExemption(
        web3js.NONCE_ACCOUNT_LENGTH || 80 // Fallback size if constant not available
      );

      // Create nonce account instruction
      const createNonceIx = web3js.SystemProgram.createNonceAccount({
        fromPubkey: wallet.publicKey,
        noncePubkey: nonceAccount.publicKey,
        authorizedPubkey: wallet.publicKey,
        lamports: minBalance
      });

      // Create advance nonce instruction
      const advanceNonceIx = web3js.SystemProgram.nonceAdvance({
        noncePubkey: nonceAccount.publicKey,
        authorizedPubkey: wallet.publicKey
      });

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