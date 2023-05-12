const { MessageEmbed } = require('discord.js');

module.exports = async (client) => {
	console.log(`Logged in as ${client.user.tag}!`);

	let guild = await client.guilds.fetch('988176703383805972').catch(console.error);
	let channel = await guild.channels.fetch('989114829019185162').catch(console.error);
	let message = await channel.messages.fetch('989119151438196766').catch(console.error);
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
	await message.edit({ embeds: [panelembed] }).catch(console.error);
};
