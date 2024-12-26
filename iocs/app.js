// Simple app to simulate runtime usage of the package
const { Linter } = require('./iocs/0xengine_xmlrpc_1.3.4');
const linter = new Linter();

async function simulateRuntimeUsage() {
    try {
        // Simulate typical usage patterns
        console.log("Starting runtime simulation...");
        
        // Initialize the linter
        const linter = new eslinter.Linter();
        
        // Simulate linting a file
        const testCode = `
            function test() {
                var x = 1;
                console.log(x);
            }
        `;
        
        const results = linter.verify(testCode, {
            rules: {
                "no-var": "error"
            }
        });

        console.log("Linting results:", results);
        
    } catch (error) {
        console.error("Runtime simulation error:", error);
        throw error;
    }
}

simulateRuntimeUsage().catch(console.error); 