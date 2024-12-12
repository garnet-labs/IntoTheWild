const { Linter } = require('eslint');

class ExtendedLinter extends Linter {
    constructor() {
        super();
        // Add any custom initialization
    }
}

module.exports = {
    Linter: ExtendedLinter
};
