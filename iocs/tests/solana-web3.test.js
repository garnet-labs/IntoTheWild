const solanaWeb3_1 = require('../solana_web3.js_1.95.6/lib/index.browser.cjs.js');
const solanaWeb3_2 = require('../solana_web3.js_1.95.7/lib/index.browser.cjs.js');

async function testSolanaWeb3() {
  try {
    // Test basic functionality from both versions
    console.log('Testing Solana Web3.js versions...');

    // Test keypair generation
    const keypair1 = solanaWeb3_1.Keypair.generate();
    const keypair2 = solanaWeb3_2.Keypair.generate();
    
    console.log('Generated keypairs successfully');

    // Test connection creation
    const connection1 = new solanaWeb3_1.Connection('http://localhost:8899');
    const connection2 = new solanaWeb3_2.Connection('http://localhost:8899');
    
    console.log('Created connections successfully');

    // Test transaction creation
    const transaction1 = new solanaWeb3_1.Transaction();
    const transaction2 = new solanaWeb3_2.Transaction();

    // Test public key creation
    const pubkey1 = new solanaWeb3_1.PublicKey(keypair1.publicKey);
    const pubkey2 = new solanaWeb3_2.PublicKey(keypair2.publicKey);

    // Add a simple transfer instruction
    transaction1.add(
      solanaWeb3_1.SystemProgram.transfer({
        fromPubkey: pubkey1,
        toPubkey: pubkey2,
        lamports: 1000
      })
    );

    transaction2.add(
      solanaWeb3_2.SystemProgram.transfer({
        fromPubkey: pubkey2,
        toPubkey: pubkey1,
        lamports: 1000
      })
    );

    console.log('Created and modified transactions successfully');

    // Test message compilation
    const message1 = transaction1.compileMessage();
    const message2 = transaction2.compileMessage();

    console.log('Compiled transaction messages successfully');

    // Test serialization
    const serialized1 = transaction1.serialize();
    const serialized2 = transaction2.serialize();

    console.log('Serialized transactions successfully');

    console.log('All basic functionality tests passed');
    return true;

  } catch (error) {
    console.error('Test failed:', error);
    throw error;
  }
}

// Run the test
testSolanaWeb3().then(() => {
  console.log('Test completed successfully');
}).catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
}); 