const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const config = require('./config.json');
const nicknameManager = require('./automato/nickname');

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

async function onReady(client) {
    client.user.setActivity({
        name: 'In development',
        type: ActivityType.Custom
    });
    console.log('Bot está online e pronto.');

    const guild = await client.guilds.fetch('1304847889717006416');

    try {
        const members = await guild.members.fetch();
        members.forEach(async (member) => {
            await nicknameManager.updateNickname(member);
        });
    } catch (error) {
        console.error('Erro ao buscar os membros do servidor:', error);
    }
}

module.exports = { createClient, onReady };
