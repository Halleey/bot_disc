const { REST, Routes } = require('discord.js');
const { CLIENT_ID, GUILD_ID, token } = require('./config.json');
const brawlersCommand = require('../bot_disc/automato/brawStar/brawlers'); 

const commands = [
  brawlersCommand.data.toJSON() // Adiciona o comando `brawlers`
];

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('Iniciando atualização dos comandos de aplicação...');

    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), 
      { body: commands }
    );

    console.log('Comandos registrados com sucesso!');
  } catch (error) {
    console.error(error);
  }
})();
