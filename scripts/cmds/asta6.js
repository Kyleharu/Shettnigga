const axios = require("axios");

module.exports = {
  config: {
    name: "ai",
    version: "1.0",
    author: "Riley Nelson", //don't change or I burn the APi
    countDown: 5,
    role: 0,
    shortDescription: {
      id: "Perintah untuk berinteraksi dengan AI Pemula",
      en: "Command to interact with Beginner AI"
    },
    longDescription: {
      id: "Perintah ini mengirim pertanyaan atau kueri ke AI Pemula dan mengembalikan jawabannya.",
      en: "This command sends a question or query to Beginner AI and returns the answer."
    },
    category: "AI",
    guide: {
      id: "Penggunaan: !beginnerai [pertanyaan atau kueri]",
      en: "{p}ai [question or query]"
    }
  },

  onStart: async function ({ api, args, message, event, usersData }) {
    const userID = event.senderID;
    const userName = await usersData.getName(userID);

    const response = args.join(" ");

    if (args.length === 0) {
      message.reply("Write down questions or queries.");
      return;
    }

    const typingIndicator = api.sendTypingIndicator(event.threadID);

    try {
      const encodedResponse = encodeURIComponent(response);
      const params = { name: userName, id: userID, bot: "barbie" }; // change your_bot_name to your bot name

      const { data } = await axios.get(`https://pemula--kurgtahu.repl.co/api/ai/${encodedResponse}`, { params });

      typingIndicator();

      const replyMessage = data.reply;
      message.reply(replyMessage);
    } catch (error) {
      console.error("Error interacting with Beginner AI:", error.message);
      typingIndicator();
      message.reply(`${error}`);
    }
  }
};