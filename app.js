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
//cevap//
client.on("message", message => {
  if (message.content.includes == `<@${client.user.id}>` || message == `<@!${client.user.id}>`) {
    message.channel.send(`ne var ananı götünden sikeyim ne var`);
  }
});
//cevap//


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};


client.login(config.token);
