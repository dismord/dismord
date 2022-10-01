const fs = require('fs');

const env = require('dotenv').config();
const ID = process.env.ID;
const TOKEN = process.env.TOKEN;

const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel] });

const evntfiles = fs.readdirSync('./evnts').filter(file => file.endsWith(".js"));
for(let file of evntfiles) {
	const evnt = require(`./evnts/${file}`);
	if(evnt.once) {
		client.once(evnt.name, (...args) => evnt.execute(...args, cmds));
	} else {
		client.on(evnt.name, (...args) => evnt.execute(...args, cmds));
	};
};

const cmdfiles = fs.readdirSync('./cmds').filter(file => file.endsWith('.js'));
const cmds = [];
for(let file of cmdfiles) {
  client.commands = new Collection();
	const cmd = require(`./cmds/${file}`);
	client.commands.set(cmd.data.name, cmd);
  cmds.push(cmd.data.toJSON());
};

client.login(TOKEN);