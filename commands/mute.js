const { MessageEmbed } = require("discord.js");


module.exports = {
    async run(client, msg, args) {
        let response;
        if (!msg.member.hasPermission("MANAGE_ROLES")) {
            response = new MessageEmbed()
                .setColor('#4B0E01')
                .setAuthor(msg.author.tag)
                .setDescription('Você não tem permissões suficientes para esse comando');
            return msg.reply(response);
        };
        if (!msg.guild.me.hasPermission("MANAGE_ROLES")) {
            response = new MessageEmbed()
                .setColor('#4B0E01')
                .setAuthor(msg.author.tag)
                .setDescription('Eu não tenho permissão para silenciar');
            return msg.reply(response);
        };
  
        if (!msg.mentions.members.first()) {
            response = new MessageEmbed()
                .setColor('#4B0E01')
                .setAuthor(msg.author.tag)
                .setDescription('É necessário que você mencione o membro que deseja mutar');
            return msg.reply(response);
        };
        if (msg.mentions.members.first().id === msg.author.id) {
            response = new MessageEmbed()
                .setColor('#4B0E01')
                .setAuthor(msg.author.tag)
                .setDescription('Eu não posso lhe silenciar');
            return msg.reply(response);
        };
        
        const reason = args.slice(1).join(" ");
    
        if (!reason) {
            response = new MessageEmbed()
                .setColor('#4B0E01')
                .setAuthor(msg.author.tag)
                .setDescription('Eu necessito de algum motivo para mutar o membro');
            return msg.reply(response);
        };
    
        const vrole = msg.mentions.members.first().roles.cache
    
        const muterole = msg.guild.roles.cache.find(x => x.name === "muted");
    
        if (!muterole) {
            response = new MessageEmbed()
                .setColor('#4B0E01')
                .setAuthor(msg.author.tag)
                .setDescription(`O cargo muted não foi criado
                                - Crie o cargo muted
                                - Configure para que o membro não consiga conversar nos canais
                                - Use o comando novamente para que eu atribua o cargo ao membro marcado para você`);
            return msg.reply(response);
        };
        
        await msg.mentions.members.first().roles.remove(vrole);
        await msg.mentions.members.first().roles.add(muterole);
    
        response = new MessageEmbed()
            .setColor('#FF2D00')
            .setAuthor(msg.author.tag)
            .setDescription(`Você mutou ${msg.mentions.users.first().tag} por ${reason}`);
        msg.reply(response);
    
        msg.mentions.members.first().send(`Você foi mutado em **${msg.guild}** por ${reason}`);
    }
};