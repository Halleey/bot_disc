const { REST, Routes } = require('discord.js');
const config = require('../config.json');

const commands = [
    {
        name: 'clean',
        description: 'Limpar chat',
    },
];
const GUILD_ID = '1304847889717006416';
const rest = new REST({ version: '10' }).setToken(config.token);

(async () => {
    try {
        console.log('Registrando o comando de slash (/clean)...');

        await rest.put(
            Routes.applicationGuildCommands(config.clientId, GUILD_ID),
            { body: commands }
        );

        console.log('Comando /clean registrado com sucesso.');
    } catch (error) {
        console.error('Erro ao registrar o comando de slash:', error);
    }
})();
