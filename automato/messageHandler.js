const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

async function handleMessage(message) {
    if (message.author.bot) return;

    const foundMessage = '!bot';
    if (message.content.toLowerCase().includes(foundMessage.toLowerCase())) {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('help')
                    .setLabel('Ajuda')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('Perfil')
                    .setLabel('Registrar perfil do braw star')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('settings')
                    .setLabel('Configurações')
                    .setStyle(ButtonStyle.Success)
            );

        await message.reply({
            content: "Olá nobre usuário, como posso te ajudar?",
            components: [row]
        });
    }
}

module.exports = { handleMessage };
