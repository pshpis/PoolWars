#!/usr/bin/env node

const { Client, Intents, Collection } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
bot.commands = new Collection();
const fs = require('fs')
let config = require('./botconfig.json');
let token = config.token;
let prefix = config.prefix;

fs.readdir('./cmds/', (err, files) => {
    if (err) console.log(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0) console.log('No commands!');
    console.log(`Loaded ${jsfiles.length} commands`);
    jsfiles.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        bot.commands.set(props.help.name, props)
        console.log(`${i + 1}.${f} loaded!`)
    })
})

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('messageCreate', async message => {
    if (message.author.bot) return;
    if (message.channel.type == "dm") return;
    let user = message.author.username;
    let userid = message.author.id;
    let messageArray = message.content.split(" ")
    let command = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    if (!message.content.startsWith(prefix)) return;
    let cmd = bot.commands.get(command.slice(prefix.length));

    if (cmd) {
        console.log(`command success`);
        cmd.run(bot, message, args);
    }
});

bot.on("interactionCreate", async interaction => {

    if (interaction.isMessageComponent()) {

        if (interaction.customId == 'CHECK_BTN') {

            let invites = await interaction.guild.invites.fetch();
            const uses = invites
                .filter(i => i.inviter.id === interaction.member.id)
                .reduce((sum, i) => sum += i.uses, 0);

            await interaction.reply({
                content: `${uses} people invited`,
                ephemeral: true
            })
        }
    }
});

bot.login(token);