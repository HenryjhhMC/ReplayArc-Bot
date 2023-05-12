const { MessageEmbed } = require('discord.js');
const categoryUtil = require('../utilities/category');
const { deleteMsg } = require('../utils');
const { order_form } = require('../functions/forms');
const { yes } = require('../emojis.json');

module.exports = {
	run: async (client, interaction) => {
		const roles = await interaction.guild.roles.fetch().catch(console.error);
		const orderRoles = [];
		roles.forEach((r) => {
			if (r.color === 15158332) {
				orderRoles.push(r);
			}
		});
		const category = await categoryUtil(interaction.guild, 'Pending');
		const unclaimedCat = await categoryUtil(interaction.guild, 'Unclaimed');
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

		let questionsembed = new MessageEmbed()
			.setColor('#cfaa41')
			.setTimestamp(new Date().toUTCString());

		let formembed = new MessageEmbed()
			.setTitle(`Order Form`)
			.setColor('#cfaa41')
			.setThumbnail(client.user.displayAvatarURL())
			.setTimestamp()
			.setFooter({
				text: 'Crowned Services',
				iconURL: client.user.displayAvatarURL(),
			});

		const responses = [];
		let cancel = false;
		let questions = order_form;
		let muser = interaction.member;
		let user = muser.id;
		let role = null;
		questionsembed.setDescription(`Loading...`);
		let m = await ticketChannel
			.send({ embeds: [questionsembed] })
			.catch(console.error);

		for (let i = 0; i < questions.length && cancel === false; i++) {
			let roleslist = '';
			if (i === 0) {
				orderRoles.forEach((or) => {
					roleslist = roleslist + `- ${or}\n`;
				});
				questionsembed.setDescription(`${questions[i]}\n${roleslist}`);
			} else {
				questionsembed.setDescription(questions[i]);
			}
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
					if (collected.first().mentions.roles.first() !== undefined) {
						role = collected.first().mentions.roles.first();
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
						`We are processing your order! We will send you quotes as soon as possible!`
					);
					await ticketChannel.permissionOverwrites
						.create(role, {
							VIEW_CHANNEL: true,
							SEND_MESSAGES: true,
							ATTACH_FILES: true,
							MENTION_EVERYONE: true,
						})
						.catch(console.error);
				})
				.catch(console.error);
			await ticketChannel
				.setParent(unclaimedCat, { lockPermissions: false })
				.catch(console.error);
		} else {
			await ticketChannel
				.send('<@&988182263437086730> There was a problem.')
				.catch(console.error);
		}
	},
};
