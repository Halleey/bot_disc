const helpCommand = require('./help'); 
const { handleStatus } = require('./status');
const { handleClean } = require('./delete'); 
const brawlersCommand = require('../automato/brawStar/brawlers'); // Importa o comando de brawlers

console.log(brawlersCommand); // Testa se está definido

async function handleCommand(interaction) {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'help') {
        await helpCommand.handleHelp(interaction); 
    } else if (commandName === 'status') {
        await handleStatus(interaction); 
    } else if (commandName === 'clean') {
        await handleClean(interaction); 
    } else if (commandName === 'brawlers') {
        if (brawlersCommand && brawlersCommand.execute) {
            await brawlersCommand.execute(interaction); // Executa o comando brawlers
        } else {
            console.error('O comando brawlers está indefinido ou sem a função execute.');
        }
    }
}

module.exports = { handleCommand };
