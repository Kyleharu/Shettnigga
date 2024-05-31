const axios = require('axios');
const moment = require("moment-timezone");
const manilaTime = moment.tz('Asia/Manila');
const formattedDateTime = manilaTime.format('MMMM D, YYYY h:mm A');

const Prefixes = [
  'gpt',
  'ai',
  'hi',
  'bot',
'Zephyrus',
  'kyle', 
];

module.exports = {
  config: {
    name: 'ai',
    version: '2.5.4',
    author: 'Kylepogi',//credits owner of this api
    role: 0,
    category: 'ai',
    shortDescription: {
      en: 'Asks an AI for an answer.',
    },
    longDescription: {
      en: 'Asks an AI for an answer based on the user prompt.',
    },
    guide: {
      en: '{pn} [prompt]',
    },
  },

  langs: {
    en: {
      final: "𝗞𝗬𝗟𝗘'𝗦 𝗕𝗢𝗧 ",
      loading: "🌐  𝗭𝗘𝗣𝗛𝗬𝗥𝗨𝗦 𝗥𝗲𝘀𝗽𝗼𝗻𝘀𝗲: \n❍━━━━━━━━━━━━━━━━━━━━❏\n⏳ |        🕗 | 𝗦𝗘𝗔𝗥𝗖𝗛𝗜𝗡𝗚 𝗬𝗢𝗨𝗥 𝗤𝗨𝗘𝗦𝗧𝗜𝗢𝗡 𝗣𝗟𝗘𝗔𝗦𝗘 𝗪𝗔𝗜𝗧..........\n❍━━━━━━━━━━━━━━━━━━━━❏"
    }
  },

  onStart: async function () {},

  onChat: async function ({ api, event, args, getLang, message }) {
    try {
      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));

      if (!prefix) {
        return;
      }

      const prompt = event.body.substring(prefix.length).trim();

      if (prompt === '') {

        await message.reply(
          "𝙷𝚎𝚕𝚕𝚘 𝙸 𝚊𝚖 𝗞𝘆𝗹𝗲'𝘀 𝗕𝗼𝘁  𝚊𝚜𝚔 𝚖𝚎 𝚊 𝚚𝚞𝚎𝚜𝚝𝚒𝚘𝚗 𝚋𝚛𝚘 !!"  
        );
        
        return;
      }

      const loadingMessage = getLang("loading");
      const loadingReply = await message.reply(loadingMessage);
      const url = "https://hercai.onrender.com/v3/hercai"; // Replace with the new API endpoint
      const response = await axios.get(`${url}?question=${encodeURIComponent(prompt)}`);

      if (response.status !== 200 || !response.data) {
        throw new Error('Invalid or missing response from API');
      }

      const messageText = response.data.reply.trim(); // Adjust according to the response structure of the new API
      const userName = getLang("final");
      const finalMsg = `${userName}\n❍━━━━━━━━━━━━━━━━━━━━❏\n${messageText}\n❍━━━━━━━━━━━━━━━━━━━━❏\n🗓️ | ⏰ 𝗗𝗔𝗧𝗘 𝗔𝗡𝗗 𝗧𝗜𝗠𝗘 :\n${formattedDateTime}\n\n𝗕𝗼𝘁 𝗔𝗱𝗺𝗶𝗻: https://www.facebook.com/itssmekylebaitit`;
      api.editMessage(finalMsg, loadingReply.messageID);

      console.log('Sent answer as a reply to user');
    } catch (error) {
      console.error(`Failed to get answer: ${error.message}`);
      api.sendMessage(
        `${error.message}.\n\nYou can try typing your question again or resending it, as there might be a bug from the server that's causing the problem. It might resolve the issue.`,
        event.threadID
      );
    }
  },
};
