const { Permissions } = require('discord.js');
const blockedChannelId = '1304847889717006419';

// Função para bloquear links em um canal específico
async function blockLinks(message) {
    const channel = message.channel;

    // Verifica se a mensagem foi enviada no canal bloqueado
    if (channel.id !== blockedChannelId) return;

    // Verifica se a mensagem contém um link (usa uma expressão regular para detectar URLs)
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    if (urlPattern.test(message.content)) {
        // Apaga a mensagem com o link
        await message.delete();

        // Envia uma mensagem informando que links não são permitidos
        const replyMessage = await message.channel.send({
            content: 'Links não são permitidos neste canal.'
        });

        // Após 3 segundos, apaga a mensagem de aviso
        setTimeout(async () => {
            try {
                await replyMessage.delete();
            } catch (error) {
                console.error('Erro ao tentar excluir a mensagem de aviso:', error);
            }
        }, 3000);  // Atraso de 3 segundos (ajuste conforme necessário)
    }
}

module.exports = { blockLinks };
