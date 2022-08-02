const Discord = require('discord.js');
const fs = require('fs');
const { MessageEmbed, MessageActionRow, MessageButton, CommandInteraction } = require('discord.js');
const { SelectMenuComponent } = require('discord-modals');

const Embed = {
    color: 0x00fcca,
    title: '**INVITE CONTEST**',
    fields: [
        {
            name: '-------------------',
            value: 'Check your invites and see leaders',
            inline: false,
        }
    ],
    image: {
        url: 'https://cdn.discordapp.com/attachments/1003297534170640447/1003661983528263820/promo.jpg'
    }
};

const Row = new MessageActionRow();
Row.addComponents(
    new MessageButton()
        .setCustomId("CHECK_BTN")
        .setStyle('PRIMARY')
        .setLabel('Check'),
);

module.exports.run = async (bot, message, args) => {
    message.channel.send({ embeds: [Embed], components: [Row] });
};

module.exports.help = {
    name: "spawnmodal"
}
