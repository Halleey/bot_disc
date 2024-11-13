// help.js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Retorna os comandos disponíveis.'),
  async execute(interaction) {
    const slashCommands = {
      help: 'Retorna os comandos disponíveis.',
      status: 'Exibe as estatísticas do servidor.',
      clean: 'Limpa as mensagens de um determinado chat',
    };

    const botCommands = {
      '!bot': 'para abrir o menu para registrar o perfil',
      '!player': 'para salvar seu perfil',
    };

    const slashHelpMessage = Object.entries(slashCommands)
      .map(([name, description]) => `/${name} - ${description}`)
      .join('\n');

    const botHelpMessage = Object.entries(botCommands)
      .map(([name, description]) => `${name} - ${description}`)
      .join('\n');

    const helpMessage = `Aqui está a lista de comandos disponíveis:\n\n**Comandos com /**\n${slashHelpMessage}\n\n**Comandos com !**\n${botHelpMessage}`;

    await interaction.reply({
      content: helpMessage,
      ephemeral: true,
    });
  },
};
