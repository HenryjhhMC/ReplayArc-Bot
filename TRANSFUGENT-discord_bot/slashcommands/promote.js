const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('promote')
		.setDescription(`Promote a user to staff`)
		.addUserOption((option) =>
			option.setName('user').setDescription('User to promote').setRequired(true)
		),
};
