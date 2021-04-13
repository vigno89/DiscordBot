const ms = require("ms");

exports.run = async (bot,message,args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Tu n'as pas la permission!")
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) return message.channel.send('Pas de membre identifié!');
    let muteTime = args[1];
    if(!muteTime) return message.channel.send("Pas de temps identifié!");
    // 10s => 10000
    let msTime = ms(muteTime);
    let muteRole = message.guild.roles.cache.find(r => r.name == "Mute");
    if(!muteRole) return message.channel.send("Le role de mute n'est pas trouver!");
    member.roles.add(muteRole);
    message.channel.send("Tu l'as mute!");

    setTimeout(() => {
        member.roles.remove(muteRole);
        message.channel.send("Tu l'as unmute!")
    }, msTime)

}

exports.help = {
name: 'mute'
}