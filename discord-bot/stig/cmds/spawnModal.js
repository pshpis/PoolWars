const Discord = require('discord.js');
const fs = require('fs');
const { MessageEmbed, MessageActionRow, MessageButton, CommandInteraction } = require('discord.js');
const { SelectMenuComponent } = require('discord-modals');

const Embed = {
    color: 0x722f37,
    title: '**INVITE CONTEST**',
    fields: [
        {
            name: '-------------------',
            value: 'Check your invites and see leaders',
            inline: false,
        }
    ],
    image: {
        url: 'https://cdn.discordapp.com/attachments/994580492819124295/999294589682860063/promo3-min.png'
    }
};

const Row = new MessageActionRow();
Row.addComponents(
    new MessageButton()
        .setCustomId("CHECK_BTN")
        .setStyle('DANGER')
        .setLabel('Check'),
);

module.exports.run = async (bot, message, args) => {
    message.channel.send({ embeds: [Embed], components: [Row] });
};

module.exports.help = {
    name: "spawnmodal"
}
