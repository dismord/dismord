module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if(!interaction.isCommand()) return;
		const cmd = interaction.client.commands.get(interaction.commandName);
		if (!cmd) return;
		try {
			await cmd.execute(interaction);
		} catch(err) {
			if(err) console.error(err);
			await interaction.reply({ content: 'something went wrong', ephemeral: true });
		};
	}
};