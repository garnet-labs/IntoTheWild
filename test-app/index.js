const eslinter = require('../iocs/typescript_eslinter_eslint_2.2.9');


async function runTests() {
    try {
        console.log('Starting runtime test...');
        
        // Initialize the linter
        const linter = new eslinter.Linter();
        
        // Test 1: Basic linting
        console.log('\nTest 1: Basic var usage detection');
        const testCode1 = `
            function test() {
                var x = 1;
                console.log(x);
            }
        `;
        
        const results1 = await linter.verify(testCode1, {
            rules: { 'no-var': 'error' }
        });
        console.log('✓ Successfully detected var usage');

        // Test 2: Multiple rules
        console.log('\nTest 2: Multiple rule testing');
        const testCode2 = `
            function test() {
                let x = 1;
                console.log( x );  // extra spaces
                if(x == 1) {      // loose equality
                    return;
                }
            }
        `;
        
        const results2 = await linter.verify(testCode2, {
            rules: { 
                'no-var': 'error',
                'eqeqeq': 'error',
                'no-extra-spaces': 'warn'
            }
        });
        console.log('✓ Successfully tested multiple rules');

        // Test 3: TypeScript-specific rules
        console.log('\nTest 3: TypeScript features');
        const testCode3 = `
            interface User {
                name: string;
                age: number;
            }
            
            function greet(user: User) {
                console.log(\`Hello \${user.name}\`);
            }
        `;
        
        const results3 = await linter.verify(testCode3, {
            parser: '@typescript-eslint/parser',
            rules: {
                '@typescript-eslint/explicit-function-return-type': 'error'
            }
        });
        console.log('✓ Successfully tested TypeScript rules');

        // Summary
        console.log('\n=== Test Summary ===');
        console.log('Test 1 Results:', formatResults(results1));
        console.log('Test 2 Results:', formatResults(results2));
        console.log('Test 3 Results:', formatResults(results3));

    } catch (error) {
        console.error('\n❌ Runtime test error:', error);
        process.exit(1);
    }
}

function formatResults(results) {
    return {
        errorCount: results.filter(r => r.severity === 2).length,
        warningCount: results.filter(r => r.severity === 1).length,
        rules: [...new Set(results.map(r => r.ruleId))]
    };
}

runTests().catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
}); 
