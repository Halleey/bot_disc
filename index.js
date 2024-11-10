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
    clean:'Limpa as mensagens de um determinado chat'
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

   else if (commandName === 'clean') {
    // Verifica se o autor tem um cargo mínimo necessário (exemplo: "Admin")
    const requiredRole = 'ZENITE III';  // Substitua pelo nome do cargo que você deseja exigir

    if (!interaction.member.roles.cache.some(role => role.name === requiredRole)) {
        return interaction.reply({ content: 'Você precisa ter o cargo de "Admin" para usar este comando.', ephemeral: true });
    }

    // Pega o canal onde o comando foi invocado
    const channel = interaction.channel;

    try {
        // Pega todas as mensagens no canal (limite de 100 mensagens por vez)
        const messages = await channel.messages.fetch({ limit: 100 });
        
        // Exclui as mensagens individualmente (independente da idade)
        for (const [id, message] of messages) {
            await message.delete();
        }

        await interaction.reply({ content: 'Todas as mensagens foram limpas com sucesso!', ephemeral: true });

    } catch (error) {
        console.error('Erro ao limpar mensagens:', error);
        await interaction.reply({ content: 'Houve um erro ao tentar limpar as mensagens.', ephemeral: true });
    }
}


});



client.on('guildMemberUpdate', async (oldMember, newMember) => {
    await nicknameManager.updateNickname(newMember);
});

client.login(config.token);
