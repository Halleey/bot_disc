const commands = {
    help: 'Mostra esta mensagem de ajuda.',
    status: 'Exibe as estatísticas do servidor.',
    clean: 'Limpa as mensagens de um determinado chat'
};

async function handleCommand(interaction) {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'help') {
        const helpMessage = Object.entries(commands)
            .map(([name, description]) => `/${name} - ${description}`)
            .join('\n');

        await interaction.reply({
            content: `Aqui está a lista de comandos disponíveis:\n${helpMessage}`,
            ephemeral: true
        });
    } else if (commandName === 'status') {
        const guild = interaction.guild;
        const serverStatus = `**Nome do servidor:** ${guild.name}
        **Total de membros:** ${guild.memberCount}
        **Canais de texto:** ${guild.channels.cache.filter(channel => channel.type === 0).size}
        **Canais de voz:** ${guild.channels.cache.filter(channel => channel.type === 2).size}
        **Criado em:** ${guild.createdAt.toDateString()}
        **Dono do servidor:** <@${guild.ownerId}>`;

        await interaction.reply({ content: serverStatus, ephemeral: false });
    } else if (commandName === 'clean') {
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
}

module.exports = { handleCommand };
