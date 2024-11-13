const axios = require('axios');
const config = require('../../config.json');
const API_KEY = config.API_KEY;

async function getPlayerProfile(playerTag) {
    const url = `https://api.brawlstars.com/v1/players/%23${playerTag}`;
    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar informações do jogador:', error);
        return null;
    }
}

async function showPlayerProfile(playerTag, message) {
    const playerInfo = await getPlayerProfile(playerTag);
    if (playerInfo) {
        const clubName = playerInfo.club ? playerInfo.club.name : 'Sem clube';
        const clubId = playerInfo.club ? playerInfo.club.tag : 'Sem ID';

        // Formata o perfil do jogador
        const profileMessage = `**🎮 Perfil do Jogador**\n
        **🔹 Nome:** ${playerInfo.name}\n
        **🔸 Nível de Experiência:** ${playerInfo.expLevel}\n
        **🏆 Troféus:** ${playerInfo.trophies}\n
        **👥 Clube:** ${clubName}\n
        **🆔 ID do Clube:** ${clubId}`;

        // Envia o perfil no Discord
        await message.reply(profileMessage);

        const guildMember = message.guild.members.cache.get(message.author.id);

        if (guildMember) {
            // Define o apelido do usuário como o nome do jogador no Brawl Stars
            try {
                await guildMember.setNickname(playerInfo.name);
                console.log(`Apelido de ${guildMember.user.username} alterado para: ${playerInfo.name}`);
            } catch (error) {
                console.error('Erro ao alterar o apelido:', error);
                message.reply('❌ Não foi possível alterar o apelido. Verifique as permissões do bot.');
            }

            // Atribui o cargo "ZENITE III" se o clube do jogador for "Zênite III"
            if (clubName === 'Zênite III') {
                const zeniteRoleIII = message.guild.roles.cache.find(role => role.name === 'ZENITE III');
                if (zeniteRoleIII) {
                    try {
                        await guildMember.roles.add(zeniteRoleIII);
                        message.reply('✅ Cargo "ZENITE III" atribuído com sucesso!');
                    } catch (error) {
                        console.error('Erro ao atribuir o cargo:', error);
                        message.reply('❌ Não foi possível atribuir o cargo. Verifique as permissões do bot.');
                    }
                } else {
                    message.reply('❌ Cargo "ZENITE III" não encontrado no servidor.');
                }
            }
        } else {
            message.reply('❌ Não foi possível encontrar o membro do servidor.');
        }
    } else {
        message.reply('❌ Não foi possível encontrar as informações do jogador. Verifique a tag.');
    }
}

module.exports = { showPlayerProfile };
