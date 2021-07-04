const { MessageEmbed } = require('discord.js');

module.exports = {
    async run(client, msg, args) {
        // Verifica as permissões tanto do bot quanto de quem executou o comando
        if (!msg.member.hasPermission('BAN_MEMBERS')) {
            const notPermissions = new MessageEmbed()
                .setColor('#951C02')
                .setAuthor(msg.author.tag)
                .setDescription('Você não tem permissões suficientes para executar esse comando');
            return msg.reply(notPermissions);
        };
        if (!msg.guild.me.hasPermission('BAN_MEMBERS')) {
            const notPermission = new MessageEmbed()
                .setColor('#951C02')
                .setAuthor(msg.author.tag)
                .setDescription('Eu não tenho permissão para banir');
            return msg.reply(notPermission);
        };
        // Execução do comando
        if (msg.mentions.users.first()) {
            if (msg.guild.member(msg.mentions.users.first())) {
                msg.guild.member(msg.mentions.users.first()).
                ban({ reason: 'Membro banido!' })
                    .then(() => {
                        const response = new MessageEmbed()
                                .setColor('#951C02')
                                .setAuthor(msg.author.tag)
                                .setDescription(`💀 -> ${msg.mentions.users.first().tag} foi banido!`);
                        msg.reply(response);
                    })
                    .catch(e => {
                        const response = new MessageEmbed()
                            .setColor('#951C02')
                            .setAuthor(msg.author.tag)
                            .setDescription(`não consegui banir o ${msg.mentions.users.first().tag}`);
                        msg.reply(response);
                        console.log(`Erro ao tentar expulsar um usuário
                                    Usuário: ${msg.mentions.users.first().tag}
                                    Id do usuário: ${msg.mentions.users.first().id}
                                    Erro: ${e}`);
                });
            } else {
                const response = new MessageEmbed()
                        .setColor('#951C02')
                        .setAuthor(msg.author.tag)
                        .setDescription('O usuário mencionado não se encontra no servidor')
                msg.reply(response);
            };
        } else {
            const response = new MessageEmbed()
                    .setColor('#951C02')
                    .setAuthor(msg.author.tag)
                    .setDescription('Mencione o usuário para que eu possa arrancar um pedaço de carne da bunda dele para que nunca mais volte');
            msg.reply(response);
        };
    }
}