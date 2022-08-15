const Discord = require('discord.js');
const { giveto } = require('../snapshot')

module.exports.run = async (bot, message, args) => {
    const from = args[0];
    const count = args[1];
    const members = giveto.slice(from, from + count)
    console.log(`Members: ${members.length}`)
    const guild = await bot.guilds.fetch(message.guildId)
    const role = guild.roles.cache.find(role => role.id === "994587758859386962")

    for (let i = 0; i < members.length; i++) {
        const id = members[i].member;

        try {
            const member = await guild.members.fetch(id)
            member.roles.add(role);
            console.log('ok')
        } catch (e) {
            console.log('not ok for ' + id)
        }
    }

    console.log('Command ended')
};

module.exports.help = {
    name: "giveog"
}
