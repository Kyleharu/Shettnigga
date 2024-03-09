module.exports = {
  config: {
    name: "boxlist",
    aliases: [],
    author: "kshitiz",  
    version: "2.0",
    cooldowns: 5,
    role: 0,
    shortDescription: {
      en: "Show the list of Messenger group chats where the bot is in."
    },
    longDescription: {
      en: "This command retrieves the list of Messenger group chats where the bot is a member."
    },
    category: "𝗢𝗪𝗡𝗘𝗥",
    guide: {
      en: "{p}{n}"
    }
  },
  onStart: async function ({ api, event, message, args }) {
    try {

      const threadList = await api.getThreadList(100, null, ["INBOX", "PENDING", "ARCHIVED"]);


      let response = 'List of Messenger group chats:\n';
      threadList.forEach(thread => {

        if (thread.isGroup) {
          response += `${thread.name} - ${thread.threadID}\n`;
        }
      });

      api.sendMessage(response, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage('Error occurred while fetching group list.', event.threadID);
    }
  }
};