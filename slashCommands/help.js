const commands = {
    help: 'Mostra esta mensagem de ajuda.',
    status: 'Exibe as estatísticas do servidor.',
    clean: 'Limpa as mensagens de um determinado chat'
};

async function handleHelp(interaction) {
    const helpMessage = Object.entries(commands)
        .map(([name, description]) => `/${name} - ${description}`)
        .join('\n');

    await interaction.reply({
        content: `Aqui está a lista de comandos disponíveis:\n${helpMessage}`,
        ephemeral: true
    });
}

module.exports = { handleHelp };
