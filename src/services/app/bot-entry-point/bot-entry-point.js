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

        this.scene = new Scene('new',
            (ctx) => {
                ctx.scene.next();
                ctx.reply('Select category', null, Markup
                    .keyboard([
                        'vegetables',
                        'fruit',
                        'baked',
                        'grain'
                    ])
                    .inline(),
                );
            },
            (ctx) => {
                ctx.session.what = ctx.message.text;

                ctx.scene.next();
                ctx.reply('What amount?');
            },
            (ctx) => {
                ctx.session.amount = ctx.message.text;

                ctx.scene.next();

                ctx.reply('measure', null, Markup
                    .keyboard([
                        'liter',
                        'kilogram',
                        'box'
                    ])
                    .inline(),
                );
            },
            (ctx) => {
                ctx.session.measure = ctx.message.text;

                ctx.scene.next();

                ctx.reply('Send your geolocation pls', null, Markup
                    .keyboard([
                        Markup.button({ action: { type: 'location' } }),
                        'No!',
                    ])
                    .oneTime());
            },
            (ctx) => {
                ctx.session.location = ctx.message.geo;

                ctx.scene.leave();

                const { amount, what, measure, location } = ctx.session;
                const { latitude, longitude } = location.coordinates;
                ctx.reply(`You will hand out ${amount} ${measure} of ${what} one the ${latitude}:${longitude}`);
            });

        this.stage = new Stage(this.scene);

        this.bot.use(this.session.middleware());
        this.bot.use(this.stage.middleware());

        this.bot.command('/new', (ctx) => {
            ctx.scene.enter('new');
        });

        setInterval(() => api('messages.send', {
            user_id: this.id,
            message: 'Again!',
            random_id: Date.now(),
            access_token: this.token
        }), 600000);
    }

    launch() {
        return this.bot.startPolling()
            .then(() => console.log('Bot is started!'))
            .catch(error => console.log(`${error}`));
    }
}

module.exports = { BotEntryPoint };