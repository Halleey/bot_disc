const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const config = require('./config.json');
const nicknameManager = require('./automato/nickname'); // Certifique-se de importar o gerenciador de apelidos

function createClient() {
    return new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
        ]
    });
}

// Função assíncrona chamada quando o bot estiver pronto
async function onReady(client) {
    // Definir o status do bot
    client.user.setActivity({
        name: 'In development',
        type: ActivityType.Custom
    });
    console.log('Bot está online e pronto.');

    try {
        // Buscar a guilda após o bot estar pronto
        const guild = await client.guilds.fetch('1304847889717006416');
        console.log('Guilda carregada:', guild.name);

        // Atualizar apelidos de todos os membros na guilda
        guild.members.fetch().then(members => {
            members.forEach(member => {
                nicknameManager.updateNickname(member); // Chama a função para atualizar os apelidos
            });
        }).catch(error => console.error('Erro ao buscar membros para atualizar apelidos:', error));

    } catch (error) {
        console.error('Erro ao buscar guilda:', error);
    }
}

module.exports = { createClient, onReady };
