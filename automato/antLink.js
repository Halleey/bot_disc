const { Permissions } = require('discord.js');
const blockedChannelId = '1304847889717006419'; 

// Lista de palavras-chave comuns em URLs de sites adultos
const adultKeywords = [
    'porn', 'xxx', 'adult', 'sex', 'cam', 'nsfw', 'hentai', 
    'redtube', 'youjizz', 'pornhub', 'xvideos', 'brazzers', 
    'onlyfans', 'chaturbate', 'nudity', 'erotic'
];

async function blockLinks(message) {
    const channel = message.channel;

    if (channel.id !== blockedChannelId) return;

    // Verifica se a mensagem contém um link (usa uma expressão regular para detectar URLs)
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    const links = message.content.match(urlPattern);

    if (links) {
        const containsAdultContent = links.some(link => 
            adultKeywords.some(keyword => link.toLowerCase().includes(keyword))
        );

        if (containsAdultContent) {
            try {
                await message.delete();

                await message.channel.send({
                    content: 'Links com conteúdo adulto não são permitidos neste canal.'
                });
            } catch (error) {
                console.error('Erro ao tentar excluir a mensagem:', error);
            }
        }
    }
}

module.exports = { blockLinks };
