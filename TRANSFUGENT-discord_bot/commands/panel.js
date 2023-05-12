const { MessageEmbed } = require('discord.js');
const { deleteMsg, hasAdministrator } = require('../utils');

exports.run = async (client, message, args) => {
	await deleteMsg(message, 500).catch(console.error);
	let perms = await hasAdministrator(message).catch(console.error);
	if (!perms) return;

	let panelembed = new MessageEmbed()
		.setColor('#cfaa41')
		.setTitle(`Welcome to the Crowned Services!`)
		.setDescription(
			`**We are ready to take your requests!**\nClick a button below to get started.`
		)
		.setThumbnail(client.user.displayAvatarURL())
		.setTimestamp()
		.setFooter({
			text: 'Crowned Services',
			iconURL: client.user.displayAvatarURL(),
		});
	await message.channel
		.send({
			embeds: [panelembed],
			components: [
				{
					type: 1,
					components: [
						{
							type: 2,
							style: 3,
							label: 'Order',
							emoji: {
								name: '🎟️',
								id: null,
							},
							custom_id: 'create_order',
						},
						{
							type: 2,
							style: 2,
							label: 'Apply',
							emoji: {
								name: '🎫',
								id: null,
							},
							custom_id: 'create_application',
						},
						{
							type: 2,
							style: 2,
							label: 'Support',
							emoji: {
								name: '📩',
								id: null,
							},
							custom_id: 'create_support',
						},
					],
				},
			],
		})
		.catch(console.error);
};

exports.help = {
	name: 'panel',
};
