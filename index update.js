const Discord = require('discord.js') 
const bot = new Discord.Client({ws: {intents: Discord.Intents.ALL}});
const fs = require("fs")
const prefix = '!';
bot.commands = new Discord.Collection();

bot.on('ready', () => {
    console.log('Bot online et pret à anéantire cockjuice')

    fs.readdir('./commands', (err, files) => {
        if(err) return console.log(err);

        let jsfile = files.filter(f => f.split(".").pop() == 'js');


        if (jsfile.length <= 0) return console.log("Could not find commands!")

        jsfile.forEach(f => {
            let props = require(`./commands/${f}`);
            bot.commands.set(props.help.name, props)
        })
    })
})

bot.on('message', (message) => {
    if(message.author.bot) return;
    if(message.channel.type !== 'text') return;
    let prefix = '!';

    let MessageArray = message.content.split(' ');
    let cmd = MessageArray[0].slice(prefix.length)
    let args = MessageArray.slice(1)

    if(!message.content.startsWith(prefix)) return;

    let commandfile = bot.commands.get(cmd);
    if(commandfile) {commandfile.run(bot,message,args)}

})

bot.on('guildMemberUpdate', (oldMember, newMember) => {
    if(oldMember.nickname !== newMember.nickname) {
        newMember.send('Tyl loic!')
    }
    let oldAvatar = oldMember.user.avatarURL() 
    let newAvatar = newMember.user.avatarURL();
    if(oldAvatar !== newAvatar) {
        newMember.send('Tu as changer ta photo!')
    }


})


bot.on('guildMemberAdd', (member) => {
    let embed = new Discord.MessageEmbed()
    .setTitle('Bienvenue dans la vague!')
    .setDescription(`Merci de bien vouloir porter la chemise blanche!\n**Nombre de membre:** ${member.guild.memberCount}\n**Propriétaire:** ${member.guild.owner.user.tag}`)
    .setColor('#cc3300')
    .setAuthor(member.guild.owner.user.tag, member.guild.owner.user.avatarURL())
    .setFooter(member.guild.name, member.guild.iconURL())
    .setThumbnail(member.user.avatarURL());

    member.send(embed)
})

bot.login("ODMxMjE4NTE0ODAyNTA3Nzg4.YHSCkQ.1uUK8qKRgnGduz5nyW4dnY-ZgZo") 