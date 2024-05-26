module.exports = {
    config: {
        name: "ping",
        aliases: ["p"],
        version: "2.0",
        author: "leeza",
        role: 0,
        shortDescription: {
            en: "Displays the current ping of the bot's system."
        },
        longDescription: {
            en: "Displays the current ping of the bot's system."
        },
        category: "System",
        guide: {
            en: "Use {p}ping to check the current ping of the bot's system."
        }
    },
    onStart: async function ({ api, event, args }) {
        const timeStart = Date.now();
        await api.sendMessage("♻️ checking ping...", event.threadID);
        const ping = Date.now() - timeStart;
        api.sendMessage(`𝗣𝗶𝗻𝗴: ${ping}𝗺𝘀 ⚡️`, event.threadID);
    }
};
