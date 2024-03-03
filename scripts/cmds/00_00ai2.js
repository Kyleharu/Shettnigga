const axios = require("axios");

module.exports = {
  config: {
    name: "ai",
    version: 1.6,
    author: "modified by leeza",
    role: 0,
    shortDescription: "AI that can speak every language on Earth fluently",
    guide: "{pn} <query>",
    category: "AI"
  },
  onChat: async ({ message: m, event: e, args: a, usersData: u }) => {
    const prefix = await global.utils.getPrefix(e.threadID) + this.config.name;
    if (a[0].toLowerCase().startsWith(prefix) || a[0].toLowerCase() === "ai") {
      try {
        const { senderID } = e;
        const tag = await u.getName(senderID);
        const response = await axios.post("https://test-ai-ihc6.onrender.com/api", {
          prompt: a.slice(1).join(" "),
          apikey: "GayKey-YMBsPUY0xUSNjHvycOx9",
          name: tag,
          id: senderID
        });

        const mentions = [{ id: senderID, tag }];
        const body = response.data.result.replace(/{name}/g, tag).replace(/{pn}/g, prefix);

        if (response.data.av) {
          const attachments = Array.isArray(response.data.av)
            ? await Promise.all(response.data.av.map(url => global.utils.getStreamFromURL(url)))
            : await global.utils.getStreamFromURL(response.data.av);

          m.reply({ body, mentions, attachment: attachments });
        } else {
          m.reply({ body, mentions });
        }
      } catch (error) {
        console.error(error);
        m.reply("Error " + error);
      }
    }
  }
};