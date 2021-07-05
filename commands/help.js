const { MessageEmbed } = require('discord.js');
const prefix = require('../config.json')

module.exports = {
    async run(client, msg, args) {
        const help = new MessageEmbed()
            .setColor('#000')
            .setTitle('🚩 == Menu de ajuda ==', '', 'https://github.com/cxnd3v')
            .setDescription(`📍 | Meu prefixo: ${prefix.prefix}\n
🔧 | Comandos:\n
🔑 => $help
👿 => $kick
💀 => $ban
😶 => $mute
🗯️ => $unmute`);

        msg.reply(help);
    }
};
