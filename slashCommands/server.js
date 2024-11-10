const { REST, Routes } = require('discord.js');
const config = require('../config.json');

const commands = [
    {
        name: 'status',
        description: 'Mostra o status do servidor',
    },
];

// IDs dos servidores
const GUILD_IDS = [
    '1304847889717006416',  // ID do servidor 1
    '530954370796355584'   // ID do servidor 2
];

const rest = new REST({ version: '10' }).setToken(config.token);

(async () => {
    try {
        console.log('Registrando o comando de slash (/status)...');

        // Registrar o comando em cada servidor
        for (const guildId of GUILD_IDS) {
            await rest.put(
                Routes.applicationGuildCommands(config.clientId, guildId),
                { body: commands }
            );
            console.log(`Comando /status registrado com sucesso no servidor ${guildId}.`);
        }

    } catch (error) {
        console.error('Erro ao registrar o comando de slash:', error);
    }
})();
