async function handleButton(interaction) {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'help') {
        await interaction.reply("Aqui está a ajuda que você precisa!");
    } else if (interaction.customId === 'info') {
        await interaction.reply("Aqui estão algumas informações úteis.");
    } else if (interaction.customId === 'settings') {
        await interaction.reply("Aqui estão as configurações.");
    }
}

module.exports = { handleButton };
