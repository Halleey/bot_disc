const { Client, GatewayIntentBits, ActivityType, EmbedBuilder } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on('ready', async () => {
    // Configura o status de atividade do bot
    client.user.setActivity({
        name: 'programando',
        type: ActivityType.Custom
    });

    // Exibe informações do bot
    console.log('Informações do Bot:');
    console.log(`ID: ${client.user.id}`);
    console.log(`Username: ${client.user.username}`);
    console.log(`Tag: ${client.user.tag}`);
    console.log(`Avatar URL: ${client.user.avatarURL()}`);
    console.log(`Data de criação: ${client.user.createdAt}`);
    console.log(`É um bot? ${client.user.bot}`);

    try {
        // Buscando o usuário pelo ID
        const OWNER = await client.users.fetch("464158970248953865");

        // Criando o embed
        const EMBED = new EmbedBuilder()
            .setAuthor({
                name: 'Sendo desenvolvido',
                iconURL: OWNER.displayAvatarURL({ dynamic: true })
            })
            .setDescription(`Sendo desenvolvido por ${OWNER.username}`);

        // Envia o embed para um canal específico
        const channel = client.channels.cache.get('1304847889717006419');
        if (channel) {
            channel.send({ embeds: [EMBED] });
        }
    } catch (error) {
        console.error('Erro ao buscar o usuário ou criar o embed:', error);
    }
});

client.on('guildMemberUpdate', async (oldMember, newMember) => {
    const rolePrefixMap = {
        'ZENITE III': '[ZNT III]',
        'beta_tester': '[TESTER]',
        'ZENITE II': '[ZNT II]'
    };

    const prefix = newMember.roles.cache.reduce((acc, role) => {
        return rolePrefixMap[role.name] || acc;
    }, '');

    if (prefix) {
        const newNickname = `${prefix} ${newMember.user.username}`;
        try {
            await newMember.setNickname(newNickname);
            console.log(`Apelido do membro alterado para: ${newNickname}`);
        } catch (error) {
            console.error(`Erro ao alterar o apelido de ${newMember.user.username}:`, error);
        }
    } else if (oldMember.nickname && (oldMember.nickname.startsWith('[ZNT III]') || oldMember.nickname.startsWith('[ZNT II]') || oldMember.nickname.startsWith('[TESTER]'))) {
        if (oldMember.nickname.startsWith('[TESTER]') && !newMember.roles.cache.has('beta_tester')) {
            try {
                await newMember.setNickname(newMember.user.username);
                console.log(`Prefixo [TESTER] removido do apelido de ${newMember.user.username}`);
            } catch (error) {
                console.error(`Erro ao remover o prefixo de ${newMember.user.username}:`, error);
            }
        } else {
            try {
                await newMember.setNickname(newMember.user.username);
                console.log(`Prefixo removido do apelido de ${newMember.user.username}`);
            } catch (error) {
                console.error(`Erro ao remover o prefixo de ${newMember.user.username}:`, error);
            }
        }
    }
});

const config = require('./config.json');
client.login(config.token);
