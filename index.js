require("dotenv/config");
const { Client, MessageEmbed } = require("discord.js");
const { files, commands } = require("./data");

const client = new Client();

const token = process.env.TOKEN;
client.login(token);

client.on("message", async (message) => {
  if (!message.guild) return;

  callCommands(message);

  files.map((fil, index) => {
    let pathName = commands[index];
    AddAudio(message, pathName, fil);
  });
});

// Register and start hook

async function AddAudio(message, name, path) {
  if (message.content === name) {
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();
      const dispatcher = connection.play("music/" + path + ".mp3");

      dispatcher.setVolume(0.9); // half the volume

      dispatcher.on("start", () => {});
    } else {
      message.reply("You need to join a voice channel first!");
    }
  }
}

function callCommands(msg) {
  if (msg.content === "!comandos") {
    const embed = new MessageEmbed()
      .setColor("#050754")
      .setTitle("OIA OS COMANDOS AI MEU OOOOOLOKO")
      .addFields({ name: "Comandos", value: commands });
    /*     embed.setAuthor("created by: Deivid Reinke Schiitz"); */
    msg.channel.send(embed);
  }
}

function RamdomVoiceOnPressKey(message) {
  ioHook.on("keydown", async (event) => {
    var tecla = String.fromCharCode(event.rawcode).toLowerCase();
    if (tecla == ".") {
      if (message.member.voice.channel) {
        const connection = await message.member.voice.channel.join();
        let P = files[Math.floor(Math.random() * 18)];
        const dispatcher = connection.play("music/" + P + ".mp3");

        dispatcher.setVolume(1); // half the volume

        dispatcher.on("start", () => {});
      } else {
        message.reply("You need to join a voice channel first!");
      }
    }
  });
}
