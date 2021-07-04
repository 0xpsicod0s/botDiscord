const { MessageEmbed } = require('discord.js');

module.exports = {
    async run(client, msg, args) {
        // Verifica as permissões tanto do bot quanto de quem executou o comando
        if (!msg.member.hasPermission('KICK_MEMBERS')) {
            const notPermissions = new MessageEmbed()
                .setColor('#951C02')
                .setAuthor(msg.author.tag)
                .setDescription('Você não tem permissões suficientes para executar esse comando');
            return msg.reply(notPermissions);
        };
        if (!msg.guild.me.hasPermission('KICK_MEMBERS')) {
            const notPermission = new MessageEmbed()
                .setColor('#951C02')
                .setAuthor(msg.author.tag)
                .setDescription('Eu não tenho permissão para expulsar');
            return msg.reply(notPermission);
        };
        // Execução do comando
        if (msg.mentions.users.first()) {
            if (msg.guild.member(msg.mentions.users.first())) {
                msg.guild.member(msg.mentions.users.first()).kick()
                    .then(() => {
                        const response = new MessageEmbed()
                            .setColor('#951C02')
                            .setAuthor(msg.author.tag)
                            .setDescription(`👿 -> ${msg.mentions.users.first().tag} foi expulso!`);
                        msg.reply(response);
                    })
                    .catch(e => {
                        const response = new MessageEmbed()
                            .setColor('#951C02')
                            .setAuthor(msg.author.username)
                            .setDescription(`não consegui expulsar o ${msg.mentions.users.first().tag}`);
                        msg.reply(response);
                        console.log(`Erro ao tentar expulsar um usuário
                                    Usuário: ${msg.mentions.users.first().tag}
                                    Id do usuário: ${msg.mentions.users.first().id}
                                    Erro: ${e}`);
                });
            } else {
                const response = new MessageEmbed()
                    .setColor('#951C02')
                    .setAuthor(msg.author.username)
                    .setDescription('O usuário mencionado não se encontra no servidor')
                msg.reply(response);
            };
        } else {
            const response = new MessageEmbed()
                .setColor('#951C02')
                .setAuthor(msg.author.username)
                .setDescription('Mencione o usuário para que eu possa dar um chutão na bunda dele');
            msg.reply(response);
        };
    }
};