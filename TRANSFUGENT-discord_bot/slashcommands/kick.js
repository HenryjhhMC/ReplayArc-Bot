const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kick a member')
		.addUserOption((option) =>
			option
				.setName('member')
				.setDescription('The member to kick')
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName('reason')
				.setDescription('The reason for kick')
				.setRequired(false)
		),
};
