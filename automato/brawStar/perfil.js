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
        // Verifica se o jogador está em um clube e armazena o nome e o ID do clube, se existir
        const clubName = playerInfo.club ? playerInfo.club.name : 'Sem clube';
        const clubId = playerInfo.club ? playerInfo.club.tag : 'Sem ID';

        // Formatação melhorada com emojis
        const profileMessage = `**🎮 Perfil do Jogador**\n
        **🔹 Nome:** ${playerInfo.name}\n
        **🔸 Nível de Experiência:** ${playerInfo.expLevel}\n
        **🏆 Troféus:** ${playerInfo.trophies}\n
        **👥 Clube:** ${clubName}\n
        **🆔 ID do Clube:** ${clubId}`;

        message.reply(profileMessage);
    } else {
        message.reply('❌ Não foi possível encontrar as informações do jogador. Verifique a tag.');
    }
}

module.exports = { showPlayerProfile };