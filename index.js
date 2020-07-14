require("dotenv/config");

const { Client, MessageEmbed, Collection } = require("discord.js");
const { files, commands } = require("./data");

const client = new Client();

client.on("message", (message) => {
  if (!message.guild) return;

  if (message.content === "!comandos") message.channel.send(callCommands);

  //ADD ALL AUDIOS
  files.map((fileMusicName, index) => {
    let command = commands[index];
    AddAudios(message, command, fileMusicName);
  });
});

async function AddAudios(message, command, fileMusicName) {
  if (message.content == command) {
    // IF YOU ARE CONNECTED IN A CHANNEL
    if (message.member.voice.channel) {
      try {
        //JOIN THE BOT TO YOUR VOICE CHANNEL
        const connection = await message.member.voice.channel.join();

        const dispatcher = connection.play("./music/" + fileMusicName + ".mp3");

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
