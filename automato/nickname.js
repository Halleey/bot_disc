
//nickname.js
const rolePrefixMap = {
    'ZENITE III': '[ZNT III]',
    'beta_tester': '[TESTER]',
    'ZENITE II': '[ZNT II]'
};

async function updateNickname(member) {
    const prefix = member.roles.cache.reduce((acc, role) => {
        return rolePrefixMap[role.name] || acc;
    }, '');

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
    } else if (member.nickname && Object.values(rolePrefixMap).some(prefix => member.nickname.startsWith(prefix))) {
        try {
            await member.setNickname(member.user.username);
            console.log(`Prefixo removido do apelido de ${member.user.username}`);
        } catch (error) {
            console.error(`Erro ao remover o prefixo de ${member.user.username}:`, error);
        }
    }
}

module.exports = {
    updateNickname
};
