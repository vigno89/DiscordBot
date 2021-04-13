exports.run = async (bot,message,args) => {
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("tu n'as pas la permission de faire cela!")
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return message.channel.send("Pas le bon membre!");
    let reason = args.slice(1).join(' ');
    if(member.roles.highest.position > message.member.roles.highest.position) return message.channel.send("tu peut pas kick quelqun avec plus de pouvoir que toi!")
    if(!reason) {reason = 'Aucune raison valable'}
    member.kick(reason)
    message.channel.send(`**${member.user.tag}** a été kick pour ${reason}`)
}

exports.help = {
name: 'kick'
}