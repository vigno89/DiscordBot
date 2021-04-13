exports.run = async (bot,message,args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("tu peut pas faire cette command criss de pain!")
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return message.channel.send("Pas le bon membre criss de pain!");
    if(member.roles.highest.position > message.member.roles.highest.position) return message.channel.send("Tu peut pas le ban, il est meilleur que toi cheh!")
    let reason = args.slice(1).join(' ');
    if(!reason) {reason = 'Aucune raison'}
    member.ban({reason: reason, days: 7})
    message.channel.send(`**${member.user.tag}** a été banni pour ${reason}`)
}

exports.help = {
name: 'ban'
}