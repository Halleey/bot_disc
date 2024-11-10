const { REST, Routes } = require('discord.js');
const config = require('../config.json');

const commands = [
    {
        name: 'status',
        description: 'Mostra o status do servidor',
    },
];
const GUILD_ID = '1304847889717006416';
const rest = new REST({ version: '10' }).setToken(config.token);

(async () => {
    try {
        console.log('Registrando o comando de slash (/status)...');

        await rest.put(
            Routes.applicationGuildCommands(config.clientId, GUILD_ID),
            { body: commands }
        );

        console.log('Comando /status registrado com sucesso.');
    } catch (error) {
        console.error('Erro ao registrar o comando de slash:', error);
    }
})();