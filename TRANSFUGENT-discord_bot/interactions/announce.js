const { MessageEmbed } = require('discord.js');
const { yes } = require('../emojis.json');

module.exports = {
	run: async (client, interaction) => {
		let message = interaction.options.getString('message');
		let channel = interaction.options.getChannel('channel');
		let role = interaction.options.getRole('role');

		let embed = new MessageEmbed()
			.setTitle(`Announcement`)
			.setDescription(message)
			.setThumbnail(client.user.displayAvatarURL())
			.setTimestamp()
			.setColor('#cfaa41')
			.setFooter({
				text: 'Crowned Services',
				iconURL: client.user.displayAvatarURL(),
			});

		if (channel === null) {
			if (role === null) {
				await interaction.channel.send({ embeds: [embed] });
			} else {
				await interaction.channel.send({ content: `${role}`, embeds: [embed] });
			}
		} else if (role === null) {
			await channel.send({ embeds: [embed] });
		} else {
			await channel.send({ content: `${role}`, embeds: [embed] });
		}

		await interaction
			.reply({
				content: `${yes} Announcement Sent!`,
				ephemeral: true,
			})
			.catch(console.error);
	},
};
