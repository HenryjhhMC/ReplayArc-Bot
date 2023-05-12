const { version } = require('../config');

module.exports = {
	run: async (client, interaction) => {
		await interaction.reply({
			content: `🏓 Pong!\n\n**Bot Version: ${version}**\nAPI Latency is: ${Math.round(client.ws.ping)}ms.`,
			ephemeral: false,
		}).catch(console.error);
	},
};