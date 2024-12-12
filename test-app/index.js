const eslinter = require('../iocs/typescript_eslinter_eslint_2.2.9');

async function runTests() {
    try {
        console.log('Starting runtime test...');
        
        // Test eslinter
        console.log('\nTesting eslinter...');
        const linter = new eslinter.Linter();
        const testCode = `
            function test() {
                var x = 1;
                console.log(x);
            }
        `;
        
        const results = await linter.verify(testCode, {
            rules: { 'no-var': 'error' }
        });
        console.log('Eslinter results:', results);

    } catch (error) {
        console.error('Runtime test error:', error);
        process.exit(1);
    }
}

runTests().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
}); 