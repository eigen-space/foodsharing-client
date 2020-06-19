const VkBot = require('node-vk-bot-api');
const api = require('node-vk-bot-api/lib/api');

class BotEntryPoint {
    id = 112534257;

    constructor(data) {
        this.token = data.token;
        this.bot = new VkBot(data.token);

        this.bot.on((ctx) => {
            console.log('dadadada');
            ctx.reply('Hello!');
        });

        // this.bot.on('message_new', ctx => ctx.reply('message_new event!'));

        setInterval(() => api('messages.send', {
            user_id: this.id,
            message: 'Again!',
            random_id: Date.now(),
            access_token: this.token
        }), 60000);
    }

    launch() {
        return this.bot.startPolling()
            .then(() => console.log('Bot is started!'))
            .catch(error => console.log(`${error}`));
    }
}

module.exports = { BotEntryPoint };