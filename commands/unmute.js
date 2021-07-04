const { MessageEmbed } = require('discord.js');

module.exports = {
    async run(client, msg, args) {
        let response;
        if (!msg.member.hasPermission("MANAGE_ROLES")) {
            response = new MessageEmbed()
                .setColor('#FF2D00')
                .setAuthor(msg.author.tag)
                .setDescription('Você não tem permissões suficientes para executar esse comando');
            return msg.reply(response);
        };
  
        if (!msg.guild.me.hasPermission("MANAGE_ROLES")) {
            response = new MessageEmbed()
                .setColor('#FF2D00')
                .setAuthor(msg.author.tag)
                .setDescription('Eu não tenho permissão para desmutar');
            return msg.reply(response);
        };
  
  
        if (!msg.mentions.members.first()) {
            response = new MessageEmbed()
                .setColor('#FF2D00')
                .setAuthor(msg.author.tag)
                .setDescription('É necessário que você mencione o membro que deseja desmutar');
            return msg.reply(response);
        };
    
        let muterole = msg.guild.roles.cache.find(x => x.name === "Muted");
    
        if (msg.mentions.members.first().roles.cache.has(muterole)) {
            response = new MessageEmbed()
                .setColor('#FF2D00')
                .setAuthor(msg.author.tag)
                .setDescription('O membro não tem o cargo muted');
            return msg.reply(response);
        };
    
        msg.mentions.members.first().roles.remove(muterole)
    
        response = new MessageEmbed()
            .setColor('#FF2D00')
            .setAuthor(msg.author.tag)
            .setDescription(`${msg.mentions.users.first().username} foi desmutado por ${msg.author.username}`);
        msg.reply(response);
            
        msg.delete()
    }
  };