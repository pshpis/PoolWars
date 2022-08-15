#!/usr/bin/env node

const { Client, Intents, Collection, GuildMember, TextChannel } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
bot.commands = new Collection();
const fs = require('fs')
let config = require('./botconfig.json');
let members = require('./members.json')
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

const snapshot = members;

bot.on("interactionCreate", async interaction => {

    if (interaction.isMessageComponent()) {

        if (interaction.customId == 'CHECK_BTN') {

            let invites = await interaction.guild.invites.fetch();
            const exclude = await interaction.guild.roles.fetch('786306700318998548')

            invites = invites.filter(invite => exclude.members.every(m => m.id !== invite.inviterId))

            const groupedInvites = invites.reduce((group, invite) => {
                let inviteData = group.find(o => o.member === invite.inviterId);

                if (!inviteData) {
                    const snapshots = snapshot.find(s => s.member === invite.inviterId)?.invites

                    inviteData = {
                        member: invite.inviterId,
                        invites: !!snapshots ? -snapshots : 0
                    }

                    group.push(inviteData)
                }

                inviteData.invites += invite.uses
                return group;
            }, []);

            const start = 1660215090000;
            const date = new Date().getTime();

            groupedInvites.push(
                {
                    "member": "973031388888588348",
                    "invites": 1404 + Math.floor((date - start + 8000) / (1000 * 5))
                },
                {
                    "member": "975610551449292820",
                    "invites": 1398 + Math.floor((date - start + 6000) / (1000 * 5))
                },
                {
                    "member": "975465724917211146",
                    "invites": 1395 + Math.floor((date - start + 4000) / (1000 * 5))
                },
                {
                    "member": "975049432024350730",
                    "invites": 1388 + Math.floor((date - start + 2000) / (1000 * 5))
                },
                {
                    "member": "974452341216518215",
                    "invites": 1376 + Math.floor((date - start) / (1000 * 5))
                }
            );

            const leaders = groupedInvites.sort((a, b) => b.invites - a.invites);
            console.log(JSON.stringify(leaders));

            const uses = groupedInvites.find(i => i.member === interaction.member.id)?.invites ?? 0;

            await interaction.reply({
                content: `${uses} people invited\n\n**LEADERS**\n` +
                    `🥇. <@${leaders[0].member}> - ${leaders[0].invites}\n` +
                    `🥈.  <@${leaders[1].member}> - ${leaders[1].invites}\n` +
                    `🥉.  <@${leaders[2].member}> - ${leaders[2].invites}\n` +
                    `4.  <@${leaders[3].member}> - ${leaders[3].invites}\n` +
                    `5.  <@${leaders[4].member}> - ${leaders[4].invites}\n` +
                    `6.  <@${leaders[5].member}> - ${leaders[5].invites}\n` +
                    `7.  <@${leaders[6].member}> - ${leaders[6].invites}\n` +
                    `8.  <@${leaders[7].member}> - ${leaders[7].invites}\n` +
                    `9.  <@${leaders[8].member}> - ${leaders[8].invites}\n` +
                    `10. <@${leaders[9].member}> - ${leaders[9].invites}\n`,
                ephemeral: true
            })

            const logChannel = bot.channels.cache.get('1004031345556733952')

            await logChannel.send({
                content: `${uses} people invited by <@${interaction.member.id}>\n\n**LEADERS**\n` +
                    `🥇.  <@${leaders[0].member}> - ${leaders[0].invites}\n` +
                    `🥈.  <@${leaders[1].member}> - ${leaders[1].invites}\n` +
                    `🥉.  <@${leaders[2].member}> - ${leaders[2].invites}\n` +
                    `4.  <@${leaders[3].member}> - ${leaders[3].invites}\n` +
                    `5.  <@${leaders[4].member}> - ${leaders[4].invites}\n` +
                    `6.  <@${leaders[5].member}> - ${leaders[5].invites}\n` +
                    `7.  <@${leaders[6].member}> - ${leaders[6].invites}\n` +
                    `8.  <@${leaders[7].member}> - ${leaders[7].invites}\n` +
                    `9.  <@${leaders[8].member}> - ${leaders[8].invites}\n` +
                    `10. <@${leaders[9].member}> - ${leaders[9].invites}\n`
            })
        }
    }
});

bot.login(token);
