class BaseSelector {

    constructor(options) {
        this.field = options.field;
        this.operator = options.operator;
        this.value = options.value;
    }

    getQueryCondition() {};
}