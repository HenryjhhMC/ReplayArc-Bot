module.exports = {
	run: async (client, interaction) => {
		await interaction.deferReply();
		const member = interaction.options.getMember('member');
		const reason = interaction.options.getString('reason');
		await member.ban({ days: 7, reason: reason }).catch(console.error);
		await interaction.editReply({
			content: `${member} has been banned.`,
			ephemeral: false,
		}).catch(console.error);
	},
};