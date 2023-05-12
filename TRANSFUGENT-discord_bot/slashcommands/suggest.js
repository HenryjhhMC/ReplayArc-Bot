const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('suggest')
		.setDescription('Make a suggestion')
		.addStringOption((option) =>
			option
				.setName('suggestion')
				.setDescription('Your suggestion')
				.setRequired(true)
		),
};
