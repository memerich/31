const Discord = require("discord.js");
const tts = require("google-tts-api");
const fs = require("fs").promises;
const util = require("util");
const download = util.promisify(require("download-file"));
const config = require("./config.json");

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
//7 24//
const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log(
    ` pingleme işlemi başarılı başarılıysa bu yazıyı loglarda görürsün`
  );
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
//7 24//
//cevap//
client.on("message", message => {
  if (message.content.includes == `<@${client.user.id}>` || message == `<@!${client.user.id}>`) {
    message.channel.send(`ne var ananı götünden sikeyim ne var`);
  }
});
//cevap//




//seslidekonuş//
/*client.on("message", message, options => {
    const { channel } = message.member.voice;
    const { ttsPlayer, name: guildName, voice } = message.guild;
    const connection = voice ? voice.connection : null;
    const [atLeastOneWord] = options.args;

    if (!channel) {
      message.reply('you need to be in a voice channel first.');
      return;
    }

    if (!channel.joinable) {
      message.reply('I cannot join your voice channel.');
      return;
    }

    if (!atLeastOneWord) {
      message.reply('you need to specify a message.');
      return;
    }

    if (connection) {
      splitToPlayable(options.args)
        .then((phrases) => {
          ttsPlayer.say(phrases);
        })
        .catch((error) => {
          message.reply(error);
        });
    } else {
      channel.join()
        .then(() => {
          logger.info(`Joined ${channel.name} in ${guildName}.`);
          message.channel.send(`Joined ${channel}.`);
          splitToPlayable(options.args)
            .then((phrases) => {
              ttsPlayer.say(phrases);
            })
            .catch((error) => {
              message.reply(error);
            });
        })
        .catch((error) => {
          throw error;
        });
    }
})*/
  
//seslidekonuş//


client.login(config.token);
