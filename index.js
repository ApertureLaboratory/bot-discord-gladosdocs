import { Client, Intents } from "discord.js";
import techs from "./techs.json" assert {type: "json"};
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import "dotenv/config";

const rest = new REST({ version: "9" }).setToken(process.env.token);

const commands = [
    {
        name: "docs",
        description: "Acesse a documentação da tecnologia escolhida!",
    },
];

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (message) => {
    let tech = Object.keys(techs);

    if (tech.includes(message.content)) {
        message.channel.send(
            `Estude ${message.content} com a documentação: ${techs[message.content]}`
        );
    }
});

(async () => {
    try {
        console.log("Started refreshing application (/) commands.");

        await rest.put(
            Routes.applicationGuildCommands(process.env.appid, process.env.guildid),
            {
                body: commands,
            }
        );

        console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error(error);
    }
})();

client.login(process.env.token);