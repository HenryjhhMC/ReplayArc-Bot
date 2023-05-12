const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('announce')
		.setDescription('Make an announcement')
		.addStringOption((option) =>
			option
				.setName('message')
				.setDescription('Message to send')
				.setRequired(true)
		)
		.addChannelOption((option) =>
			option
				.setName('channel')
				.setDescription('Channel to send in')
				.setRequired(false)
		)
		.addRoleOption((option) =>
			option.setName('role').setDescription('Role to ping').setRequired(false)
		),
};
