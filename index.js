const { Client, GatewayIntentBits } = require('discord.js');
const config = require('./config.json');
const clientConfig = require('./clientConfig');
const commandHandler = require('./slashCommands/handleCommand');
const buttonInteractions = require('./automato/buttonInteractions');
const messageHandler = require('./automato/messageHandler');
const guildMemberHandler = require('./automato/guildMemberHandler');
const client = clientConfig.createClient();
const  antLink = require('./automato/antLink')
// Quando o bot estiver pronto
client.on('ready', clientConfig.onReady);

// Comandos de interação
client.on('interactionCreate', commandHandler.handleCommand);

// Interações com botões
client.on('interactionCreate', buttonInteractions.handleButton);

// Mensagens contendo "!bot"
client.on('messageCreate', messageHandler.handleMessage);

client.on('messageCreate', (message) => 
{
    if(message.author.bot) return;

    antLink.blockLinks(message)
})

// Atualizações no servidor
client.on('guildMemberUpdate', guildMemberHandler.handleGuildMemberUpdate);

// Login do bot
client.login(config.token);
