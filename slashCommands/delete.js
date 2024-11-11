
async function handleClean(interaction) {
    // Código para o comando clean...
    const requiredRole = 'ZENITE III';
    if (!interaction.member.roles.cache.some(role => role.name === requiredRole)) {
        return interaction.reply({ content: 'Você não tem permissão para usar este comando, procure alguém da administração🤖', ephemeral: true });
    }

    const channel = interaction.channel;
    try {
        const messages = await channel.messages.fetch({ limit: 100 });
        for (const [id, message] of messages) {
            await message.delete();
        }
        await interaction.reply({ content: 'Todas as mensagens foram limpas com sucesso!', ephemeral: true });
    } catch (error) {
        console.error('Erro ao limpar mensagens:', error);
        await interaction.reply({ content: 'Houve um erro ao tentar limpar as mensagens.', ephemeral: true });
    }
}

module.exports = { handleClean };
