const { Selector } = require('../selector/selector');
const { SelectorOperatorType } = require('../../enums/selector-operator.enum');

class SimpleSelector extends Selector {

    constructor(options) {
        super(options);

        this.operator = options.operator || SelectorOperatorType.EQUAL;
    }

    getQueryCondition() {
        const template = `${this.field} ${this.operator} $${this.field}`;
        return new Query(template, { [this.field]: this.value });
    };
}