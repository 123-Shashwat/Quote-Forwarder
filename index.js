const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const QUOTER_BOT_ID = process.env.QUOTER_BOT_ID;
const TARGET_CHANNEL_ID = process.env.TARGET_CHANNEL_ID;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}! Ready to forward quotes.`);
});

client.on('messageCreate', async (message) => {
    // Check if message is from the quoter bot
    if (message.author.id === QUOTER_BOT_ID) {
        try {
            const targetChannel = await client.channels.fetch(TARGET_CHANNEL_ID);
            if (targetChannel) {
                // Forward content, images/files, and embeds
                await targetChannel.send({
                    content: message.content,
                    files: [...message.attachments.values()].map(att => att.url),
                    embeds: message.embeds
                });
            }
        } catch (error) {
            console.error('Error forwarding message:', error);
        }
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);