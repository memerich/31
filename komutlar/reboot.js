const Discord = require('discord.js');
exports.run = async (client, message, args) => {
      if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.sendEmbed(new Discord.RichEmbed().setDescription('Yetkin yok qwe').setColor(10038562));
let olusacakrol = args.slice(0).join(' ');   
let member = message.guild.members.get('659838505991798825');
    let muterole = message.guild.roles.find(x => x.name === olusacakrol);
    if (!muterole) {
        try {
            muterole = await message.guild.createRole({
                name: olusacakrol,
                color: 'RANDOM',
                permission: [] 
            });
        } catch(e) {
            console.log(e.message);
        }
    };

    await (member.addRole(muterole.id));
    message.channel.send(`rolu actım tamam abu eheheh muah bye`);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['rol'],
  cooldown: 1
};

exports.help = {
  name: 'rolaç',
  description: 'Bir rol açar',
  usage: 'rolaç [isim]'
};
