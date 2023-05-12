module.exports = {
	run: async (client, interaction) => {
		let user = interaction.options.getMember('user');
		await user.roles.add('988182263437086730').catch(console.error);
		await interaction.reply({
			content: `${user} was successfully promoted to Manager!`,
			ephemeral: true,
		});
	},
};
