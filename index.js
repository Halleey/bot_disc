const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const config = require('./config.json');
const nicknameManager = require('./automato/nickname');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on('ready', async () => {
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
});


const commands = {
    help: 'Mostra esta mensagem de ajuda.',
    status: 'Exibe as estatísticas do servidor.',
};



client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'help') {
        const helpMessage = Object.entries(commands)
            .map(([name, description]) => `/${name} - ${description}`)
            .join('\n');

        await interaction.reply({
            content: `Aqui está a lista de comandos disponíveis:\n${helpMessage}`,
            ephemeral: true
        });
    }
   
    else if (commandName === 'status') {
        const guild = interaction.guild;
        const serverStatus = `**Nome do servidor:** ${guild.name}
        **Total de membros:** ${guild.memberCount}
        **Canais de texto:** ${guild.channels.cache.filter(channel => channel.type === 0).size}
        **Canais de voz:** ${guild.channels.cache.filter(channel => channel.type === 2).size}
        **Criado em:** ${guild.createdAt.toDateString()}
        **Dono do servidor:** <@${guild.ownerId}>`;

        await interaction.reply({
            content: serverStatus,
            ephemeral: false // Define como true se quiser que só o usuário veja a resposta
        });
    }

});



client.on('guildMemberUpdate', async (oldMember, newMember) => {
    await nicknameManager.updateNickname(newMember);
});

client.login(config.token);
