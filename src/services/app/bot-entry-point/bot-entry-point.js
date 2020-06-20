const { MeasureType } = require("../../../enums/enums.js");
const VkBot = require('node-vk-bot-api');
const api = require('node-vk-bot-api/lib/api');
const Markup = require('node-vk-bot-api/lib/markup');
const Scene = require('node-vk-bot-api/lib/scene');
const Stage = require('node-vk-bot-api/lib/stage');
const Session = require('node-vk-bot-api/lib/session');

class BotEntryPoint {
    id = 112534257;
    session = new Session();

    constructor(data) {
        this.token = data.token;
        this.bot = new VkBot(data.token);

        this.bot.command('/select', (ctx) => {
            ctx.reply('Select your age', null, Markup
                .keyboard([
                    '10-20',
                    '20-30',
                    '40-50',
                    '50-60',
                ])
                .inline(),
            );
        });

        this.scene = new Scene('Раздача',
            (ctx) => {
                ctx.scene.next();
                ctx.reply('Что отдаем?', null, Markup
                    .keyboard([
                        'Овощи',
                        'Фрукты',
                        'Выпечка',
                        'Крупы'
                    ])
                    .oneTime(),
                );
            },
            (ctx) => {
                ctx.session.amount = ctx.message.text;

                ctx.scene.next();

                ctx.reply('Выбери в чем измеряется объем :)', null, Markup
                    .keyboard([
                        MeasureType.KILOGRAMS,
                        MeasureType.BOXES,
                        MeasureType.LITERS
                    ])
                    .oneTime(),
                );
            },
            (ctx) => {
                ctx.session.what = ctx.message.text;

                ctx.scene.next();
                let amountContext = 'киллограм'
                switch (ctx.session.amount) {
                    case MeasureType.BOXES: {
                        amountContext = 'коробок';
                        break;
                    }
                    case MeasureType.LITERS: {
                        amountContext = 'литров';
                        break;
                    }
                }

                ctx.reply(`Уточни, сколько ${amountContext}`);
            },
            (ctx) => {
                ctx.session.measure = ctx.message.text;

                ctx.scene.next();

                ctx.reply('Скажи нам, где будет раздача', null, Markup
                    .keyboard([
                        Markup.button({ action: { type: 'location' } })
                    ])
                    .oneTime());
            },
            (ctx) => {
                ctx.session.location = ctx.message.geo;

                ctx.scene.next();

                ctx.reply('И последнее, время :)');
            },
            (ctx) => {
                ctx.session.time = ctx.message.text;

                ctx.scene.leave();

                ctx.reply(`Супер! Пойду писать спасателям продуктов :)`);
            });

        this.stage = new Stage(this.scene);

        this.bot.use(this.session.middleware());
        this.bot.use(this.stage.middleware());

        this.bot.command('/Раздача', (ctx) => {
            ctx.scene.enter('Раздача');
        });
    }

    launch() {
        return this.bot.startPolling()
            .then(() => console.log('Bot is started!'))
            .catch(error => console.log(`${error}`));
    }
}

module.exports = { BotEntryPoint };
