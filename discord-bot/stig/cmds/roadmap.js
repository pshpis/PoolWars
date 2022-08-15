const Discord = require('discord.js');
const fs = require('fs');

const exampleEmbed = {
	color: 0x722f37,
	title: '**ROADMAP 1.0**',
	author: {
		name: 'The Elder Katts',
		icon_url: 'https://cdn.discordapp.com/attachments/994585649657159740/1001601796730536007/photo_2022-07-09_19-05-50.jpg',
		url: 'https://elderkatts.com/',
	},
	thumbnail: {
		url: 'https://cdn.discordapp.com/attachments/994585649657159740/1001601796730536007/photo_2022-07-09_19-05-50.jpg',
	},
	fields: [
		{
			name: '**Stage 0**',
			value: '➼ Pool Wars v0 and NFT Swaps Developing \n➼ Marketing Campaign \n➼ Connection to Launchpad \n➼ DAO Collaborations \n➼ Partnerships with Builders \n➼ Free Mint of COMBAT CARDS \n➼ Pool Wars v0 and NFT Swaps Launch',
			inline: false,
		},
		{
			name: '**Stage 1**',
			value: '➼ Mint of Elder Katts \n➼ Listing on ME \n➼ Pool Wars v1 Launch \n➼ Provide Unique Gaming Experience \n➼ Releasing Complex Tokenomics \n➼ Katts Upgrading System Development',
			inline: false,
		},
		{
			name: '**Stage 2**',
			value: '➼ Rarity Sensetive Staking \n➼ $KATT Token with LP \n➼ Releasing Katts Upgrades System \n➼ Pool Wars Amplification \n➼ Airdrop for the Holders',
			inline: false,
		},
        {
			name: '**Stage 3**',
			value: '➼ Forming the DAO \n➼ Roadmap 2.0 \n➼ Holders only Raffles \n➼ New Utility Development \n➼ Collaborations \n➼ Gen2 Collection Launch \n➼ Mint with $KATT Token',
			inline: false,
		},
	],
	image: {
		url: 'https://cdn.discordapp.com/attachments/994585649657159740/1001601859636711484/promo-min.png',
	}
};

module.exports.run = async (bot, message, args) => {
    message.channel.send({ embeds: [exampleEmbed] });

};

module.exports.help = {
    name: "roadmap"
}