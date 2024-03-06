module.exports = {
  config: {
    name: "edit",
    version: "1.0",
    author: "Mr perfect",
    countDown: 0,
    role: 0,
    shortDescription: { vi: "", en: "" },
    longDescription: { vi: "", en: "" },
    category: "admin",
    guide: { en: "" },
    envConfig: {}
  },
  onStart: async function ({ event, api, args }) {
    // Implement the logic for the "edit" command here
    // This function will be called when the command is triggered

    // Example: Reply with a success message
    api.sendMessage("Command 'edit' executed successfully!", event.threadID);
  },
  onChat: async function ({ event, message }) {
    const command = event.body.toLowerCase();
    const [_, messageId, ...newMessageParts] = command.split(" ");
    const newMessage = newMessageParts.join(" ");

    if (messageId && newMessage) {
      try {
        const editedMessage = await message.client.updateMessage(newMessage, messageId);
        message.reply(`Message with ID ${messageId} successfully edited. New message: ${editedMessage.body}`);
      } catch (error) {
        message.reply("sorry you cant my admin ");
      }
    } else {
      message.reply("Sorry you cant my admin");
    }
  }
};