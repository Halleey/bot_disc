const { Client, GatewayIntentBits } = require('discord.js');
const config = require('./config.json');
const clientConfig = require('./clientConfig');
const commandHandler = require('./slashCommands/handleCommand');
const buttonInteractions = require('./automato/buttonInteractions');
const messageHandler = require('./automato/messageHandler');
const guildMemberHandler = require('./automato/guildMemberHandler');
const antLink = require('./automato/antLink');
const { showPlayerProfile } = require('./automato/perfil'); // Importa a função de perfil do jogador

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
