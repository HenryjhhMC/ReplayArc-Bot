const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban a member')
		.addUserOption((option) =>
			option
				.setName('member')
				.setDescription('The member to ban')
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName('reason')
				.setDescription('The reason for ban')
				.setRequired(false)
		),
};
