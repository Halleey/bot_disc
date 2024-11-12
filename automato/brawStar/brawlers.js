const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const config = require('../../config.json');
const API_KEY = config.API_KEY;

// Função para buscar todos os brawlers
async function searchApi() {
  const url = 'https://api.brawlstars.com/v1/brawlers';
  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
      },
    });
    return response.data.items;  // Retorna todos os brawlers
  } catch (error) {
    console.error('Erro ao buscar todos os brawlers:', error);
    return null;
  }
}

// Função para o comando `/brawlers`, que exibe todos os Brawlers ao usuário
async function getAllBrawlers(interaction) {
  await interaction.deferReply();  // Defer para evitar timeout na resposta

  const brawlers = await searchApi();

  if (brawlers) {
    // Formata a lista de brawlers como uma string
    const brawlerList = brawlers.map(brawler => brawler.name).join(', ');
    await interaction.editReply(`Aqui estão todos os Brawlers disponíveis: ${brawlerList}`);
  } else {
    await interaction.editReply('Ocorreu um erro ao buscar os Brawlers.');
  }
}

// Define o comando slash `/brawlers` e associa diretamente a função `getAllBrawlers`
const brawlersCommand = {
  data: new SlashCommandBuilder()
    .setName('brawlers')
    .setDescription('Mostra todos os Brawlers disponíveis'),
  execute: getAllBrawlers,  // Associa diretamente a função
};

module.exports = brawlersCommand;

