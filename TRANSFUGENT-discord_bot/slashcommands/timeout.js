const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timeout')
		.setDescription('Timeout a member')
		.addUserOption((option) =>
			option
				.setName('member')
				.setDescription('The member to timeout')
				.setRequired(true)
		)
		.addNumberOption((option) =>
			option
				.setName('duration')
				.setDescription('The duration in minutes [Default: 5 minutes]')
				.setRequired(false)
		)
		.addStringOption((option) =>
			option
				.setName('reason')
				.setDescription('The reason for timeout')
				.setRequired(false)
		),
};
