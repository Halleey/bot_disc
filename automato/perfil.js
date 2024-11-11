const axios = require('axios');

// Função para buscar as informações do jogador na API do Brawl Stars
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

// Função para formatar e exibir as informações do jogador
async function showPlayerProfile(playerTag, message) {
    const playerInfo = await getPlayerProfile(playerTag);

    if (playerInfo) {
        // Verifica se o jogador está em um clube e armazena o nome do clube, se existir
        const clubName = playerInfo.club ? playerInfo.club.name : 'Sem clube';

        message.reply(`**Perfil do jogador:**\nNome: ${playerInfo.name}\nNível: ${playerInfo.expLevel}\nTroféus: ${playerInfo.trophies}\nClube: ${clubName}`);
    } else {
        message.reply('Não foi possível encontrar as informações do jogador. Verifique a tag.');
    }
}

module.exports = { showPlayerProfile };