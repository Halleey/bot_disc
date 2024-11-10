const { REST, Routes } = require('discord.js');
const config = require('../config.json');

const newCommands = [
    {
        name: 'clean',
        description: 'Limpar chat',
    },
    {
        name: 'status',
        description: 'Mostra o status do servidor',
    },
    {
        name: 'help',
        description: 'Mostra a lista de comandos disponíveis.',
    }
];

// IDs dos servidores
const GUILD_IDS = [
    '1304847889717006416',  // ID do servidor 1
    '530954370796355584'   // ID do servidor 2
];

const rest = new REST({ version: '10' }).setToken(config.token);

(async () => {
    try {
        console.log('Registrando comandos de slash...');

        for (const guildId of GUILD_IDS) {
            // Primeiro, busca os comandos já registrados
            const existingCommands = await rest.get(Routes.applicationGuildCommands(config.clientId, guildId));

            // Junta os comandos existentes com os novos
            const commandsToRegister = [
                ...existingCommands.filter(command => !newCommands.some(newCmd => newCmd.name === command.name)),
                ...newCommands
            ];

            // Registra todos os comandos, mantendo os anteriores
            await rest.put(
                Routes.applicationGuildCommands(config.clientId, guildId),
                { body: commandsToRegister }
            );

            console.log(`Comandos registrados com sucesso no servidor ${guildId}.`);
        }

    } catch (error) {
        console.error('Erro ao registrar comandos de slash:', error);
    }
})();
