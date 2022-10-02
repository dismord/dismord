const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder().setName('ping').setDescription('simple but magical command'),
	async execute(interaction) {
		interaction.reply({ content: 'PONG!' });
	}
};