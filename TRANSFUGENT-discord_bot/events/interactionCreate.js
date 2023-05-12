const fs = require('fs');

const interactionFiles = fs
	.readdirSync('./interactions')
	.filter((file) => file.endsWith('.js'));

module.exports = async (client, interaction) => {
	if (interaction.isCommand()) {
		if (
			interactionFiles.find(
				(filename) => filename === `${interaction.commandName}.js`
			)
		) {
			const { run } = require(`../interactions/${interaction.commandName}.js`);
			run(client, interaction);
			return;
		} else {
			console.error('The interaction file was not found.');
			return;
		}
	} else if (interaction.isButton()) {
		if (
			interactionFiles.find(
				(filename) => filename === `${interaction.customId}.js`
			)
		) {
			const { run } = require(`../interactions/${interaction.customId}.js`);
			run(client, interaction);
			return;
		} else {
			console.error('The interaction file was not found.');
			return;
		}
	} else {
		return;
	}
};
