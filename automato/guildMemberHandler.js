const nicknameManager = require('./nickname');

async function handleGuildMemberUpdate(oldMember, newMember) {
    await nicknameManager.updateNickname(newMember);
}

module.exports = { handleGuildMemberUpdate };
