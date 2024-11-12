const { Client, GatewayIntentBits } = require('discord.js');
const config = require('../bot_disc/config.json');
const clientConfig = require('../bot_disc/clientConfig');
const commandHandler = require('../bot_disc/slashCommands/handleCommand');
const buttonInteractions = require('../bot_disc/automato/buttonInteractions');
const messageHandler = require('../bot_disc/automato/messageHandler');
const guildMemberHandler = require('../bot_disc/automato/guildMemberHandler');
const antLink = require('../bot_disc/automato/antLink');
const { showPlayerProfile } = require('../bot_disc/automato/brawStar/perfil'); 

// Criação do cliente
const client = clientConfig.createClient();

// Quando o bot estiver pronto
client.on('ready', clientConfig.onReady);

// Comandos de interação
client.on('interactionCreate', commandHandler.handleCommand);

// Interações com botões
client.on('interactionCreate', buttonInteractions.handleButton);

// Mensagens contendo "!bot"
client.on('messageCreate', messageHandler.handleMessage);

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    antLink.blockLinks(message);

    // Comando para exibir perfil do jogador Brawl Stars
    if (message.content.startsWith('!player')) {
        const playerTag = message.content.split(' ')[1];
        if (playerTag) {
            showPlayerProfile(playerTag, message); // Chama a função para exibir o perfil
        } else {
            message.reply('Por favor, forneça a tag do jogador. Exemplo: `!player B8J9V9L2Q`');
        }
    }
});

// Atualizações no servidor
client.on('guildMemberUpdate', guildMemberHandler.handleGuildMemberUpdate);

// Login do bot
client.login(config.token);
