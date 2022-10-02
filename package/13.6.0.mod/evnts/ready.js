const env = require("dotenv").config();
const ID = process.env.ID;
const TOKEN = process.env.TOKEN;

const { Routes } = require('discord-api-types/v9');

const { REST } = require('@discordjs/rest');
const rest = new REST({ version: '9' }).setToken(TOKEN);

module.exports = {
	name: 'ready',
	once: true,
	async execute(client, cmds) {
		try {
			await rest.put(Routes.applicationCommands(ID), { body: cmds });
		} catch(err) {
			if(err) console.error(err);
      process.exit(1);
		};
    console.log('== BOT IS NOW ONLINE ==');
	}
};