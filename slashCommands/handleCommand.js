// handleCommand.js
const helpCommand = require('./help'); 
const { handleStatus } = require('./status');
const { handleClean } = require('./delete'); 

async function handleCommand(interaction) {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'help') {
        await helpCommand.handleHelp(interaction); 
    } else if (commandName === 'status') {
        await handleStatus(interaction); 
    } else if (commandName === 'clean') {
        await handleClean(interaction); 
    }
}

module.exports = { handleCommand };
