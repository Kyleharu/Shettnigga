const fs = require('fs');

module.exports = {
  config: {
    name: "file",
    version: "1.0",
    author: "Kyle",//modified by Kylepogi
    countDown: 5,
    role: 0,
    shortDescription: "Send bot script",
    longDescription: "Send bot specified file ",
    category: "owner",
    guide: "{pn} file name. Ex: .{pn} filename"
  },

  onStart: async function ({ message, args, api, event }) {
    const permission = ["100052395031835"];
    if (!permission.includes(event.senderID)) {
      return api.sendMessage("⛔ 𝗔𝗖𝗖𝗘𝗦𝗦 𝗗𝗘𝗡𝗜𝗘𝗗  𝗒𝗈𝗎 𝖼𝖺𝗇'𝗍 𝗎𝗌𝖾 𝗍𝗁𝗂𝗌 𝖿𝖾𝖺𝗍𝗎𝗋𝖾 𝗈𝗇𝗅𝗒 𝗆𝗒 𝖫𝗈𝗋𝖽 𝖼𝖺𝗇 𝗎𝗌𝖾𝖽 𝗍𝗁𝗂𝗌.凸( •̀_•́ )凸 ", event.threadID, event.messageID);
    }
    
    const fileName = args[0];
    if (!fileName) {
      return api.sendMessage("𝚕𝚎 𝚏𝚒𝚌𝚑𝚒𝚎𝚛 ?? ಠωಠ.", event.threadID, event.messageID);
    }

    const filePath = __dirname + `/${fileName}.js`;
    if (!fs.existsSync(filePath)) {
      return api.sendMessage(`🔴 𝗡𝗢𝗧 𝗙𝗢𝗨𝗡𝗗 [✖]: ${fileName}.js`, event.threadID, event.messageID);
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    api.sendMessage({ body: fileContent }, event.threadID);
  }
};
