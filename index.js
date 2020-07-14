require("dotenv/config");
const { Client, MessageEmbed, Collection } = require("discord.js");
const { files, commands } = require("./data");

const client = new Client();
const newUsers = new Collection();

const token = "Njk1ODAxMzEzNjAyMTc1MDA2.Xoj06w.I0aQNzHFyh6t4FZ7ns4kQ6-05F4";
client.login(token);

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  newUsers.set(member.id, member.user);
  console.log(member);

  if (newUsers.size > 10) {
    const defaultChannel = guild.channels.find((channel) =>
      channel.permissionsFor(guild.me).has("SEND_MESSAGES")
    );
    const userlist = newUsers.map((u) => u.toString()).join(" ");
    defaultChannel.send("EEEITA BIXO\n" + userlist);
    newUsers.clear();
  }
});

client.on("message", async (message) => {
  if (!message.guild) return;

  //ADD ALL AUDIOS
  files.map((fil, index) => {
    let pathName = commands[index];
    AddAudio(message, pathName, fil);
  });

  //ASK FOR SHARE COMMANDS
  callCommands(message);
});

async function AddAudio(message, name, path) {
  if (message.content === name) {
    if (message.member.voice.channel) {
      try {
        const connection = await message.member.voice.channel.join();
        const dispatcher = connection.play("music/" + path + ".mp3");

        dispatcher.setVolume(1);

        dispatcher.on("start", () => {});
      } catch (error) {
        if (error) throw error;
      }
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
