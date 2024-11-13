// delete.js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clean')
    .setDescription('Limpa as mensagens de um determinado chat'),
  async execute(interaction) {
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
      await interaction.deferReply({ ephemeral: true });

      const messages = await channel.messages.fetch({ limit: 100 });
      for (const [id, message] of messages) {
        await message.delete();
      }

      await interaction.editReply({
        content: 'Todas as mensagens foram limpas com sucesso!'
      });
    } catch (error) {
      console.error('Erro ao limpar mensagens:', error);

      await interaction.editReply({
        content: 'Houve um erro ao tentar limpar as mensagens.'
      });
    }
  },
};
