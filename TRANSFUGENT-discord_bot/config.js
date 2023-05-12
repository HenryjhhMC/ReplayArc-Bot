require('dotenv-flow').config();

module.exports = {
	clientid: process.env.CLIENT_ID,
	token: process.env.TOKEN,
	owner: process.env.OWNER,
	botmanager: process.env.BOTMANAGER,
	version: process.env.VERSION,
	prefix: process.env.PREFIX,
	guild_id: process.env.GUILD_ID,
};
