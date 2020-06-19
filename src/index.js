const { environment } = require('./environments/environment');
const { BotEntryPoint } = require('./services/app/bot-entry-point/bot-entry-point');

const botStarter = new BotEntryPoint({ token: environment.token });

botStarter.launch();