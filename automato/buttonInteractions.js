async function handleButton(interaction) {
    if (!interaction.isButton()) return;
    
    if (interaction.customId === 'help') {
        await interaction.reply("Aqui está a ajuda que você precisa! \n para descobrir comandos **'/' digite '/help'**");
    } else if (interaction.customId === 'Perfil') {
        await interaction.reply("Por favor, digite sua tag desta  forma : !player GVJLLQTU (não se esqueça de substituir pelo seu id real)");
    } else if (interaction.customId === 'settings') {
        await interaction.reply("Aqui estão as configurações.");
    }
}
module.exports = { handleButton };
