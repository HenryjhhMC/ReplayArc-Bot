const { prefix } = require('../config');

module.exports = async (client, message) => {
	if (!message.guild) return;

	if (message.author.bot) return;

	if (message.content.indexOf(prefix) !== 0) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	const cmd = client.commands.get(command);
	if (!cmd) return;

	cmd.run(client, message, args);
};
