// status.js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Exibe as estatísticas do servidor.'),
  async execute(interaction) {
    const guild = interaction.guild;
    const serverStatus = `**Nome do servidor:** ${guild.name}
    **Total de membros:** ${guild.memberCount}
    **Canais de texto:** ${guild.channels.cache.filter(channel => channel.type === 0).size}
    **Canais de voz:** ${guild.channels.cache.filter(channel => channel.type === 2).size}
    **Criado em:** ${guild.createdAt.toDateString()}
    **Dono do servidor:** <@${guild.ownerId}>`;

    await interaction.reply({ content: serverStatus, ephemeral: false });
  },
};
