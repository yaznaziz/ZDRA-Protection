const db = require('quick.db');

module.exports = async(client, guild) => {
    try {
    require('../functions/guildDeleteFunction').get(guild, db).catch(() => {});
    } catch {
        console.log("")
    }
};