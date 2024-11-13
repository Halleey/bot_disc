const { REST, Routes } = require('discord.js');
const { CLIENT_ID, GUILD_ID, token } = require('./config.json');
const brawlersCommand = require('../bot_disc/automato/brawStar/brawlers'); 
const handleHelp = require('../bot_disc/slashCommands/help');
const handleStatus = require('../bot_disc/slashCommands/status');
const handleClean = require('../bot_disc/slashCommands/delete');

const commands = [
  brawlersCommand.data.toJSON(), // Comando brawlers
  handleHelp.data.toJSON(),     // Comando help
  handleStatus.data.toJSON(),   // Comando status
  handleClean.data.toJSON()     // Comando clean
];

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('Iniciando atualização dos comandos de aplicação...');

    // Registra os comandos na guilda (apenas para um servidor específico)
    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), 
      { body: commands }
    );

    console.log('Comandos registrados com sucesso!');
  } catch (error) {
    console.error('Erro ao registrar comandos:', error);
  }
})();
