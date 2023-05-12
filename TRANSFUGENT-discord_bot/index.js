const { token, version, clientid } = require('./config');
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Intents, Collection } = require('discord.js');
const cmds = [];

const client = new Client({
	partials: ['CHANNEL'],
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_BANS,
		Intents.FLAGS.GUILD_INTEGRATIONS,
		Intents.FLAGS.GUILD_INVITES,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.DIRECT_MESSAGES,
	],
});

client.commands = new Collection();

let state = 0;

client.once('ready', () => {
	console.log('ReplayArc Online!');

	const commands = [];

	let commandFiles = fs
		.readdirSync('./slashcommands')
		.filter((file) => file.endsWith('.js'));

	for (let file of commandFiles) {
		let command = require(`./slashcommands/${file}`);
		commands.push(command.data.toJSON());
	}

	const rest = new REST({ version: '9' }).setToken(token);

	(async () => {
		try {
			console.log('Started refreshing application (/) commands.');

			// UNCOMMENT TO DELETE
			/* await rest.get(Routes.applicationCommands(clientid)).then((data) => {
				const promises = [];
				for (const command of data) {
					const deleteUrl = `${Routes.applicationCommands(clientid)}/${command.id
						}`;
					cmds.push(command);
					promises.push(rest.delete(deleteUrl));
				}
				return Promise.all(promises);
			}); */

			await rest.get(Routes.applicationCommands(clientid)).then((data) => {
				for (const command of data) {
					cmds.push(command);
				}
			});

			await rest.put(Routes.applicationCommands(clientid), { body: commands });

			console.log('Successfully reloaded application (/) commands.');
		} catch (error) {
			console.error(error);
		}
	})();

	const setPresence = () => {
		const presences = [
			{
				type: 'WATCHING',
				message: `ReplayArc Studios!`,
			},
			{
				type: 'PLAYING',
				message: `Bot Version: v${version}`,
			},
		];
		if (state == presences.length) {
			state = 0;
		}
		let presence = presences[state];
		client.user.setPresence({
			activities: [
				{
					name: presence.message,
					type: presence.type,
					url: 'https://discord.gg',
				},
			],
			status: 'online',
		});
		state++;
	};

	setPresence();
	setInterval(() => {
		setPresence();
	}, 30000);
});

client.once('reconnecting', () => {
	console.log('ReplayArc Reconnecting...');
});

client.once('disconnect', () => {
	console.log('ReplayArc Disconnected.');
});

client.on('messageCreate', async (message) => {
	if (message.mentions.has(client.user, { ignoreEveryone: true })) {
		return;
	}
	if (message.channel.type == 'dm' && !message.author.bot) {
		return;
	}
});

fs.readdir('./events/', (err, files) => {
	if (err) return console.error;
	files.forEach((file) => {
		if (!file.endsWith('.js')) return;
		const evt = require(`./events/${file}`);
		let evtName = file.split('.')[0];
		console.log(`Loaded event '${evtName}'`);
		client.on(evtName, evt.bind(null, client));
	});
});

fs.readdir('./commands/', async (err, files) => {
	if (err) return console.error;
	files.forEach((file) => {
		if (!file.endsWith('.js')) return;
		let props = require(`./commands/${file}`);
		let cmdName = file.split('.')[0];
		console.log(`Loaded command '${cmdName}'`);
		client.commands.set(cmdName, props);
	});
});

client.login(token);

module.exports = {
	client,
	cmds,
};
