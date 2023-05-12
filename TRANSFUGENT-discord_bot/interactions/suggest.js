const { MessageEmbed } = require('discord.js');
const { yes } = require('../emojis.json');

module.exports = {
	run: async (client, interaction) => {
		let suggestion = interaction.options.getString('suggestion');

		let embed = new MessageEmbed()
			.setTitle(`New Suggestion`)
			.setDescription(suggestion)
			.setThumbnail(client.user.displayAvatarURL())
			.setTimestamp()
			.setAuthor({
				name: interaction.user.tag,
				iconURL: interaction.user.displayAvatarURL(),
			})
			.setColor('#cfaa41')
			.setFooter({
				text: 'Crowned Services',
				iconURL: client.user.displayAvatarURL(),
			});

		let channel = await interaction.guild.channels.fetch('988176703878750244');
		await channel
			.send({ embeds: [embed] })
			.then(async (m) => {
				await m.react('👍');
				await m.react('👎');
			})
			.catch(console.error);

		await interaction
			.reply({
				content: `${yes} Your suggestion has been Sent!`,
				ephemeral: true,
			})
			.catch(console.error);
	},
};
