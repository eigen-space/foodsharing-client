const { BaseSqlDataService } = require('../base-sql/base.sql.data.service');
const { Query } = require('../../../entities/query/query');

class QueryDataService {
    static ID_FIELD = 'id';
    dbProvider = new BaseSqlDataService();

    insertOrUpdate(data, params) {
        const keys = Object.keys(data)
            // Filter out undefined values
            .filter(key => data[key] !== undefined);
        const keyParams = keys.map(key => `${key}`).join(', ');
        const processedKeys = keys.map(key => `$${key}`).join(', ');

        const uniqueId = params.uniqueId || QueryDataService.ID_FIELD;
        const onConflictFields = keys.map(key => `${key} = excluded.${key}`).join(', ');

        const { schema, table } = params;
        const template = `
        insert into ${schema}.${table} (${keyParams}) 
        values (${processedKeys})
        on conflict (${uniqueId}) do update 
          set ${onConflictFields}
          returning id;
        `;

        // eslint-disable-next-line no-console
        console.log('template for insert request: ', template);

        const query = new Query(template, data);
        return this.dbProvider.query<T>(query);
    }

    get(params) {
        const { schema, table, selector } = params;

        const templateParts = [
            'select *',
            `from ${schema}.${table} i`
        ];

        let values = {};
        if (selector) {
            const { template: condition, values: whereParams } = selector.getQueryCondition();
            templateParts.push(`where ${condition}`);
            values = { ...whereParams };
        }

        const template = templateParts.join('\n');

        // eslint-disable-next-line no-console
        console.log('template for get request: ', template);

        const query = new Query(`${template};`, values);
        return this.dbProvider.query<T>(query);
    }
}
