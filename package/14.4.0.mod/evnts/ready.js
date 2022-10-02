const env = require("dotenv").config();
const ID = process.env.ID;
const TOKEN = process.env.TOKEN;

const { Routes, REST } = require('discord.js');
const rest = new REST({ version: '10' }).setToken(TOKEN);

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