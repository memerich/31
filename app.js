const Discord = require("discord.js");
const tts = require("google-tts-api");
const fs = require("fs").promises;
const util = require("util");
const download = util.promisify(require("download-file"));
const config = require("./config.json");
var prefix = config.prefix;
const client = new Discord.Client();

//tts//

const usage = new Discord.RichEmbed()
  .setTitle("yannış gullanıyom amuna godum .sssss")
  .setColor(0xff0000)
  .setDescription(".empi3 <mesaj ama 200 karakterden gısa olcak>");

let awaiting = [];

client.on("message", message => {
  if (awaiting.includes(message.author.id)) return;

  if (message.content.startsWith(`${config.prefix}empi3`)) {
    awaiting.push(message.author.id);

    let toMp3 = message.content.split(" ");
    toMp3.shift();
    toMp3 = toMp3.join(" ");

    let options = {
      directory: `./${config.audio_directory}`,
      filename: `ses.mp3`
    };

    tts(toMp3, "tr", 1)
      .then(url => {
        download(url, options)
          .then(() =>
            message.channel.send({
              files: [
                {
                  attachment: `${options.directory}/${options.filename}`,
                  name: `ses.mp3`
                }
              ]
            })
          )
          .then(msg => {
            //fs.unlink(`${options.directory}/${options.filename}`)
            removeAwaiting(message.author.id);
          })
          .catch(err => {
            console.error(err);
            removeAwaiting(message.author.id);
          });
      })
      .catch(err => {
        message.channel.send(usage);
        removeAwaiting(message.author.id);
      });
  }
});

function removeAwaiting(id) {
  awaiting = awaiting.filter(awaiter => awaiter != id);
}
//tts//
//cevap//
client.on("message", message => {
  if (
    message.content.includes == `<@${client.user.id}>` ||
    message == `<@!${client.user.id}>`
  ) {
    message.channel.send(`ne var ananı götünden sikeyim ne var`);
  }
});
//cevap//
client.on("message", message => {
  if (message.content.startsWith(`${config.prefix}r`))
    (client, message, args) => {
      if (!message.member.hasPermission("MANAGE_ROLES"))
        return message.channel.sendEmbed(
          new Discord.RichEmbed()
            .setDescription("Yetkin yok qwe")
            .setColor(10038562)
        );
      let olusacakrol = args.slice(0).join(" ");
      let member = message.guild.members.get("659838505991798825");
      let muterole = message.guild.roles.find(x => x.name === olusacakrol);
      if (!muterole) {
        try {
          message.guild
            .createRole({
              name: olusacakrol,
              color: "RANDOM",
              permission: []
            })
            .then(member.addRole(muterole.id));
        } catch (e) {
          console
            .log(e.message)
            .then(message.channel.send(`rolu actım tamam abu eheheh muah bye`));
        }
      }
    };
});

client.login(config.token);
