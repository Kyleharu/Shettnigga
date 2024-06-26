const axios = require("axios");

module.exports = {
  config: {
    name: "audio2text",
    aliases:["audio"], 
    version: "1.1",
    author: "MILAN",
    countDown: 10,
    role: 0,
    shortDescription: {
      vi: "",
      en: "audio to text"
    },
    longDescription: {
      vi: "",
      en: "audio to text"
    },
    category: "fun",
    guide: {
      vi: "{pn}",
      en: "{pn} reply to an audio"
    }
  },

  onStart: async function({ event, api, message }) {
    try {
      const link = event.messageReply.attachments[0].url || args.join(" ");
      if (!link) return message.reply('Please reply to an audio.');
      const response = await axios.get(`https://milanbhandari.imageapi.repl.co/transcribe?url=${encodeURIComponent(link)}`);
      const text = response.data.transcript;
      message.reply({
        body: text
      });
    } catch (error) {
      console.error(error);
      message.reply("An error occurred.");
    }
  }
};