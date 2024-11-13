//nickname.js
const rolePrefixMap = {
    'ZENITE III': '[ZNT III]',
    'beta_tester': '[TESTER]',
    'ZENITE II': '[ZNT II]'
};

async function updateNickname(member, playerName = null) {
    // Define o apelido base como o nome do jogador ou mantém o apelido atual
    const baseName = playerName || (member.nickname && member.nickname.replace(/^\[.*?\]\s/, '')) || member.user.username;

    // Determina o prefixo baseado nos cargos do usuário
    const prefix = member.roles.cache.reduce((acc, role) => rolePrefixMap[role.name] || acc, '');

    // Se o prefixo é necessário, cria o apelido final com o prefixo
    const newNickname = prefix ? `${prefix} ${baseName}` : baseName;

    // Se o apelido atual é diferente do desejado, atualiza
    if (member.nickname !== newNickname) {
        try {
            await member.setNickname(newNickname);
            console.log(`Apelido de ${member.user.username} alterado para: ${newNickname}`);
        } catch (error) {
            console.error(`Erro ao alterar o apelido de ${member.user.username}:`, error);
        }
    }
}

module.exports = {
    updateNickname
};
