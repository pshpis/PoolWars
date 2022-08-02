const Discord = require('discord.js');
const fs = require('fs');

const exampleEmbed = {
	color: 0x722f37,
	title: '**TAVERN IS TEMPORARILY CLOSED**',
	fields: [
		{
			name: '-------------------',
			value: 'OPENING DATE: TBA',
			inline: false,
		},
	],
	image: {
		url: 'https://cdn.discordapp.com/attachments/994580492819124295/997118734684651591/promo_2-min.png'
	}
};


module.exports.run = async (bot, message, args) => {
    message.channel.send({ embeds: [exampleEmbed] });

};

module.exports.help = {
    name: "links"
}
