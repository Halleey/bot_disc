// Importa os comandos
const { execute: handleStatus } = require('./status'); // A função 'execute' do comando de status
const { execute: handleClean } = require('./delete');  // A função 'execute' do comando de limpeza
const helpCommand = require('./help'); // Comando de ajuda
const brawlersCommand = require('../automato/brawStar/brawlers'); // Comando brawlers

// Função que gerencia os comandos recebidos
async function handleCommand(interaction) {
    if (!interaction.isCommand()) return; // Verifica se a interação é um comando

    const { commandName } = interaction; // Pega o nome do comando da interação

    // Comando /help
    if (commandName === 'help') {
        await helpCommand.execute(interaction); // Chama o método 'execute' do comando de ajuda
    } 
    // Comando /status
    else if (commandName === 'status') {
        await handleStatus(interaction); // Chama a função 'execute' do comando de status
    } 
    // Comando /clean
    else if (commandName === 'clean') {
        await handleClean(interaction); // Chama a função 'execute' do comando de limpeza
    } 
    // Comando /brawlers
    else if (commandName === 'brawlers') {
        if (brawlersCommand && brawlersCommand.execute) {
            await brawlersCommand.execute(interaction); // Executa o comando de brawlers
        } else {
            console.error('O comando brawlers está indefinido ou sem a função execute.');
        }
    }
}

module.exports = { handleCommand };
