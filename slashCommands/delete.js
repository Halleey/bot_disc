async function handleClean(interaction) {
    const requiredRole = 'ZENITE III';

    // Verifica se o usuário tem o papel necessário
    if (!interaction.member.roles.cache.some(role => role.name === requiredRole)) {
        return interaction.reply({
            content: 'Você não tem permissão para usar este comando, procure alguém da administração🤖',
            ephemeral: true
        });
    }

    const channel = interaction.channel;
    try {
        // Defere a resposta para indicar que o bot está "pensando"
        await interaction.deferReply({ ephemeral: true });

        // Busca e apaga as mensagens
        const messages = await channel.messages.fetch({ limit: 100 });
        for (const [id, message] of messages) {
            await message.delete();
        }

        // Edita a resposta com o resultado da ação
        await interaction.editReply({
            content: 'Todas as mensagens foram limpas com sucesso!'
        });
    } catch (error) {
        console.error('Erro ao limpar mensagens:', error);

        // Edita a resposta em caso de erro
        await interaction.editReply({
            content: 'Houve um erro ao tentar limpar as mensagens.'
        });
    }
}

module.exports = { handleClean };
