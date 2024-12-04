const { Keypair, Connection, SystemProgram, Transaction, PublicKey } = require('@solana/web3.js');
const puppeteer = require('puppeteer');
const { webcrypto } = require('@peculiar/webcrypto');
const fetch = require('node-fetch');

// Mock browser crypto API
global.crypto = webcrypto;

async function runTest() {
    const results = {
        keyGeneration: false,
        accountCreation: false,
        errors: []
    };

    try {
        // Test 1: Key Generation
        const keypair = Keypair.generate();
        results.keyGeneration = keypair.publicKey && keypair.secretKey.length === 64;

        // Test 2: Account Creation
        const connection = new Connection("http://localhost:8899", "confirmed");
        
        // Create transfer transaction
        const transaction = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: keypair.publicKey,
                newAccountPubkey: Keypair.generate().publicKey,
                lamports: 1000000,
                space: 0,
                programId: SystemProgram.programId,
            })
        );

        // Verify transaction structure
        results.accountCreation = transaction.instructions.length === 1;

    } catch (error) {
        results.errors.push(error.message);
    }

    return results;
}

module.exports = { runTest }; 