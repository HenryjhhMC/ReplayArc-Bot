module.exports = {
	run: async (client, interaction) => {
		let user = interaction.options.getMember('user');
		await user.roles.remove('988182263437086730').catch(console.error);
		await interaction.reply({
			content: `${user} was successfully demoted from Manager!`,
			ephemeral: true,
		});
	},
};
