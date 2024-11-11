const { Permissions } = require('discord.js');
const blockedChannelId = '1304847889717006419'; 

async function blockLinks(message) {
    const channel = message.channel;

    if (channel.id !== blockedChannelId) return;

    // Verifica se a mensagem contém um link (usa uma expressão regular para detectar URLs)
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    if (urlPattern.test(message.content)) {
        try {
            // Apaga a mensagem com o link
            await message.delete();

            // Informa o usuário que links são proibidos neste canal
            await message.channel.send({
                content: 'Links não são permitidos neste canal.'
            });
        } catch (error) {
            console.error('Erro ao tentar excluir a mensagem:', error);
        }
    }
}

module.exports = { blockLinks };
