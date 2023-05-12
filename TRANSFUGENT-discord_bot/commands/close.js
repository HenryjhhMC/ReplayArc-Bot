const discordTranscripts = require('discord-html-transcripts');
const { deleteMsg, hasAdministrator } = require('../utils');

exports.run = async (client, message, args) => {
	await deleteMsg(message, 500).catch(console.error);
	let perms = await hasAdministrator(message).catch(console.error);
	if (!perms) return;

	const channel = message.channel;
	const transcripts = await message.guild.channels.fetch(
		'990289476314099792'
	);
	await discordTranscripts
		.createTranscript(channel)
		.then(async (attachment) => {
			transcripts.send({
				content: `Transcript from ${message.channel.name}`,
				files: [attachment],
			});
			message.channel
				.send('Ticket closed! Deleting this ticket in 5 seconds!')
				.then((msg) => {
					setTimeout(
						() =>
							msg
								.edit('Ticket closed! Deleting this ticket in 4 seconds!')
								.then((msg) => {
									setTimeout(
										() =>
											msg
												.edit(
													'Ticket closed! Deleting this ticket in 3 seconds!'
												)
												.then((msg) => {
													setTimeout(
														() =>
															msg
																.edit(
																	'Ticket closed! Deleting this ticket in 2 seconds!'
																)
																.then((msg) => {
																	setTimeout(
																		() =>
																			msg.edit(
																				'Ticket closed! Deleting this ticket in 1 second!'
																			),
																		1000
																	);
																}),
														1000
													);
												}),
										1000
									);
								}),
						1000
					);
				});
			setTimeout(() => message.channel.delete(), 5000);
		})
		.catch(console.error);
};

exports.help = {
	name: 'close',
};
