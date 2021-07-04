const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');

const red = '\u001b[0;31m', 
white = '\u001b[0;37m',
bgRed = '\u001b[41;92m'

client.on("ready", () => {
    console.log();
    console.log(bgRed + '           BOT FEITO PARA PRATICAR - CxN 2021              ');
    console.log(white + '######  ##        ######     ##     ######   #####    #####');
    console.log(white + '##       ##       ##          ##       ##    ##   ##  ##   ##');
    console.log(white + '##       ##       ## ###      ##       ##    ##   ##  ##   ##');
    console.log(red + '##       ###      ##          ##       ##    ##   ##  ##   ##');
    console.log(red + ' ######   ######   ######     ##       ##     #####   ##   ##');
    console.log();
});

client.on('disconnect', () => {
    console.log('Bot desconectado');
});

client.on('message', msg => {
    // Verifica se a mensagem é um bot. Se sim, ele para a execução
    if (msg.author.bot) return;
    // Verifica se a mensagem veio de um servidor. Se não, ele para a execução
    if (!msg.guild) return;
    // Verifica se o comando tem o prefixo
    if (!msg.content.startsWith(config.prefix));

    const args = msg.content.split(' ').slice(1);
    let cmd = msg.content.split(' ')[0];
    cmd = cmd.slice(config.prefix.length);

    try {
        let cmdFile = require(`./commands/${cmd}.js`);
        delete require.cache[require.resolve(`./commands/${cmd}.js`)];
        return cmdFile.run(client, msg, args);
    } catch(e) {
        console.log(`Erro: ${e}`);
    };
    
    // Escuta se o bot foi marcado. Se sim, ele responde o prefixo juntamente com o comando de ajuda
    if (msg.content == `<@${client.user.id}` || msg.content == `<@!${client.user.id}>`) {
        const marked = new Discord.MessageEmbed()
            .setColor('#000')
            .setDescription(`📍 | Meu prefixo: $\n
                            🔧 | Comandos:\n
                            🔑 => $help
                            👿 => $kick
                            💀 => $ban
                            😶 => $mute
                            🗯️ => $unmute`);
        msg.reply(marked);
    };

});

client.login(config.token);