const { MessageEmbed } = require('discord.js');
const categoryUtil = require('../utilities/category');
const { deleteMsg } = require('../utils');
const { application_form } = require('../functions/forms');
const { yes } = require('../emojis.json');

module.exports = {
	run: async (client, interaction) => {
		const category = await categoryUtil(interaction.guild, 'Applications');
		const ticketChannel = await interaction.guild.channels
			.create(`application-${interaction.user.username}`, {
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

		let questionsembed = new MessageEmbed()
			.setColor('#cfaa41')
			.setTimestamp(new Date().toUTCString());

		let formembed = new MessageEmbed()
			.setTitle(`Application Form`)
			.setColor('#cfaa41')
			.setThumbnail(client.user.displayAvatarURL())
			.setTimestamp()
			.setFooter({
				text: 'Crowned Services',
				iconURL: client.user.displayAvatarURL(),
			});

		const responses = [];
		let cancel = false;
		let questions = application_form;
		let muser = interaction.member;
		let user = muser.id;
		questionsembed.setDescription(`Loading...`);
		let m = await ticketChannel
			.send({ embeds: [questionsembed] })
			.catch(console.error);

		for (let i = 0; i < questions.length && cancel === false; i++) {
			questionsembed.setDescription(questions[i]);
			questionsembed.setFooter({
				text: `Question ${i + 1}/${questions.length}`,
			});
			m.edit({ embeds: [questionsembed] }).catch(console.error);
			const filter = (mg) => mg.author.id === user;

			await ticketChannel
				.awaitMessages({ filter, max: 1, time: 300000, errors: ['time'] })
				.then(async (collected) => {
					if (collected.size === 0) {
						cancel = true;
						return;
					}
					responses.push(collected.first().content);
					setTimeout(() => {
						collected.first().delete();
					}, 500);
				})
				.catch((err) => {
					console.log(err);
				});
		}

		if (responses.length !== 0) {
			let c = 0;
			responses.forEach(async () => {
				formembed.addField(`${questions[c]}`, `${responses[c]}`, false);
				c++;
			});
			await deleteMsg(m, 500).catch(console.error);
			await ticketChannel
				.send({ content: `<@&988182263437086730>`, embeds: [formembed] })
				.then(async () => {
					await ticketChannel.send(
						`Someone will review your application and get back to you ASAP.`
					);
				})
				.catch(console.error);
		} else {
			await ticketChannel
				.send('<@&988182263437086730> There was a problem.')
				.catch(console.error);
		}
	},
};
