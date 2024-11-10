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

    console.log('Bot está online e pronto.');

    // Obter o servidor pelo ID
    const guild = await client.guilds.fetch('1304847889717006416');

    try {
        // Buscar todos os membros do servidor
        const members = await guild.members.fetch();

        members.forEach(async (member) => {
            const rolePrefixMap = {
                'ZENITE III': '[ZNT III]',
                'beta_tester': '[TESTER]',
                'ZENITE II': '[ZNT II]'
            };
530954370796355584
            // Identificar o prefixo com base nos cargos
            const prefix = member.roles.cache.reduce((acc, role) => {
                return rolePrefixMap[role.name] || acc;
            }, '');

            // Verificar e ajustar o apelido conforme necessário
            if (prefix) {
                const newNickname = `${prefix} ${member.user.username}`;
                if (member.nickname !== newNickname) {
                    try {
                        await member.setNickname(newNickname);
                        console.log(`Apelido de ${member.user.username} alterado para: ${newNickname}`);
                    } catch (error) {
                        console.error(`Erro ao alterar o apelido de ${member.user.username}:`, error);
                    }
                }
            } else if (member.nickname && (member.nickname.startsWith('[ZNT III]') || member.nickname.startsWith('[ZNT II]') || member.nickname.startsWith('[TESTER]'))) {
                try {
                    await member.setNickname(member.user.username);
                    console.log(`Prefixo removido do apelido de ${member.user.username}`);
                } catch (error) {
                    console.error(`Erro ao remover o prefixo de ${member.user.username}:`, error);
                }
            }
        });

    } catch (error) {
        console.error('Erro ao buscar os membros do servidor:', error);
    }
});

// Evento para atualizar o apelido de novos membros ou quando seus cargos mudarem
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
        try {
            await newMember.setNickname(newMember.user.username);
            console.log(`Prefixo removido do apelido de ${newMember.user.username}`);
        } catch (error) {
            console.error(`Erro ao remover o prefixo de ${newMember.user.username}:`, error);
        }
    }
});

const config = require('./config.json');
client.login(config.token);
