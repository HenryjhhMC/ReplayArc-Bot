const discordTranscripts = require('discord-html-transcripts');
const { hasAdministratorInteraction } = require('../utils');

module.exports = {
	run: async (client, interaction) => {
		/* let perms = await hasAdministratorInteraction(interaction).catch(console.error);
		if (!perms) return; */

		const channel = interaction.channel;
		const transcripts = await interaction.guild.channels.fetch(
			'990289476314099792'
		);
		interaction.deferUpdate();
		await discordTranscripts
			.createTranscript(channel)
			.then(async (attachment) => {
				transcripts.send({
					content: `Transcript from ${interaction.channel.name}`,
					files: [attachment],
				});
				interaction.channel
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
																			() => {
																				msg.edit(
																					'Ticket closed! Deleting this ticket in 1 second!'
																				);
																				setTimeout(() => interaction.channel.delete(), 1000);
																			},
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
			})
			.catch(console.error);
	}
}