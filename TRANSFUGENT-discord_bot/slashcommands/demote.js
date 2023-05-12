const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('demote')
		.setDescription(`Demote a user to staff`)
		.addUserOption((option) =>
			option.setName('user').setDescription('User to demote').setRequired(true)
		),
};
