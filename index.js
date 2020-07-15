require("dotenv/config");

const fs = require("fs");
const path = require("path");

const { Client, MessageEmbed, Collection } = require("discord.js");
const client = new Client();

const musicFolder = "music";
const signal = "!";
const commands = fs
  .readdirSync(musicFolder)
  .map((file) => signal.concat(file.slice(0, file.indexOf(".mp3"))));

client.on("message", (message) => {
  if (!message.guild) return;

  //send all the commands
  if (message.content === "!comandos") message.channel.send(callCommands);

  //ADD ALL AUDIOS
  commands.map((command, index) => {
    AddAudios(message, command, index);
  });
});

async function AddAudios(message, command, index) {
  //if the user message it's the same as one of the commands
  if (message.content == command) {
    // IF YOU ARE CONNECTED IN A CHANNEL
    if (message.member.voice.channel) {
      try {
        //JOIN THE BOT TO YOUR VOICE CHANNEL
        const connection = await message.member.voice.channel.join();

        const musicFile = command.replace("!", "").concat(".mp3");
        const currentMusicFile = path.join(musicFolder, musicFile);
        const dispatcher = connection.play(currentMusicFile);

        dispatcher.setVolume(1);

        dispatcher.on("start", () => {});
      } catch (error) {
        console.log(error);
      }
    } else {
      return message.reply("You need to join a voice channel first!");
    }
  }
}

const callCommands = new MessageEmbed()
  .setColor("#050754")
  .setTitle("OIA OS COMANDOS AI MEU OOOOOLOKO")
  .addFields({ name: "Comandos", value: commands });
/*     embed.setAuthor("created by: Deivid Reinke Schiitz"); */

const token = process.env.TOKEN;
client.login(token);
