<div align="center">
<img src="./github/banner.png" alt="Banner" width=auto height="200"/><br>
Teamly.js allows you to create bots for the Teamly app using JavaScript! If you like it, feel free to contribute to the development :)

# Create Your First Bot with Teamly.js!
</div>
<div>

```js
const { TeamlyClient,Embed } = require("teamly.js");
const client = new TeamlyClient("BOT_TOKEN");

client.on("ready", ({bot}) => {
    console.log(`Bot is ready: ${bot.username}`)
})

client.on("MESSAGE_SEND", async (msg) => {
    const content = String(msg.message.content).trim().toLowerCase(); 

    if(content === "!ping") {
        client.bot.sendMessage(msg.channelId, "Pong!")
    }
    
    if(content === "!embed") {
        const embed = new Embed({
          title: "Teamly.js",
          description: `Teamly.js!`,
          color: "#feb236"
        })

        client.bot.sendMessage(msg.channelId, "", [embed.toJSON()])
    }
})

client.connect();
```

**Teamly API**: [Click](https://docs.teamly.one/introduction-796437m0)<br>
**Teamly Developer**: [Click](https://teamly.one/developers)<br>

</div>
