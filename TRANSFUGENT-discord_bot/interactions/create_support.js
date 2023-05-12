const { MessageEmbed } = require('discord.js');
const categoryUtil = require('../utilities/category');
const { yes } = require('../emojis.json');

module.exports = {
	run: async (client, interaction) => {
		const category = await categoryUtil(interaction.guild, 'Support');
		const ticketChannel = await interaction.guild.channels
			.create(`ticket-${interaction.user.username}`, {
				parent: category.id,
				permissionOverwrites: [
					{
						allow: ['VIEW_CHANNEL', 'ATTACH_FILES', 'MENTION_EVERYONE'],
						id: interaction.user.id,
					},
					{
						deny: ['VIEW_CHANNEL', 'ATTACH_FILES', 'MENTION_EVERYONE'],
						id: interaction.guild.id,
					},
				],
			})
			.catch(console.error);
		let closeembed = new MessageEmbed()
			.setTitle(`All finished?`)
			.setDescription(`Click the button below to close the ticket!`)
			.setThumbnail(client.user.displayAvatarURL())
			.setTimestamp()
			.setColor('#cfaa41')
			.setFooter({
				text: 'Crowned Services',
				iconURL: client.user.displayAvatarURL(),
			});

		let msgembed = await client.api.channels(ticketChannel.id).messages.post({
			data: {
				embeds: [closeembed],
				components: [
					{
						type: 1,
						components: [
							{
								type: 2,
								style: 4,
								label: 'Close Ticket',
								custom_id: 'close_ticket',
								emoji: {
									name: '✖️',
									id: null,
								},
							},
						],
					},
				],
			},
		});
		let membed = await ticketChannel.messages.fetch(msgembed.id);
		await membed.pin();
		interaction.reply({
			content: `${yes} Successfully created your ticket for you! (${ticketChannel})`,
			ephemeral: true,
		});

		await ticketChannel
			.send(
				`Hello! We are happy to help you with your query. Please leave a message below and a <@&988182263437086730> will be with you as soon as possible.`
			)
			.catch(console.error);
	},
};
