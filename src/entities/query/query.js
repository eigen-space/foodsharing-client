class Query {

    constructor(template, values = {}) {
        this.template = template;
        this.values = values;
    }
}

module.exports = { Query };
