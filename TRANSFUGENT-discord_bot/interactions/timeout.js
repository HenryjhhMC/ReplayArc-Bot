module.exports = {
	run: async (client, interaction) => {
		await interaction.deferReply();
		const member = interaction.options.getMember('member');
		const minutes = interaction.options.getNumber('duration');
		const reason = interaction.options.getString('reason');
		await member.timeout(minutes * 60 * 1000, reason).catch(console.error);
		await interaction.editReply({
			content: `${member} has been timed out.`,
			ephemeral: false,
		}).catch(console.error);
	},
};