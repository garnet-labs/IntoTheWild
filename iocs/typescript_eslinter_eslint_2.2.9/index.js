const { Linter } = require('./typescript_eslinter_eslint_2.2.9');

class ExtendedLinter extends Linter {
    constructor() {
        super();
    }
}

module.exports = {
    Linter: ExtendedLinter
};
