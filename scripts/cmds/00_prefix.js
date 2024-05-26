const moment = require("moment-timezone");
const manilaTime = moment.tz('Asia/Manila');
const formattedDateTime = manilaTime.format('MMMM D, YYYY h:mm A');
module.exports = {
 config: {
	 name: "prefix",
	 version: "1.0",
	 author: "Tokodori_Frtiz",//remodified by Kyle
	 countDown: 5,
	 role: 0,
	 shortDescription: "no prefix",
	 longDescription: "no prefix",
	 category: "auto 🪐",
 },

 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "prefix") {
 return message.reply({
 body: `
heyy {userNameTag}, my prefix is [ × ]\n\n📅 | ⏰ 𝗗𝗔𝗧𝗘 𝗔𝗡𝗗 𝗧𝗜𝗠𝗘 :\n${formattedDateTime}\n📌 𝗛𝗢𝗪 𝗧𝗢 𝗨𝗦𝗘??:
➥ help [number of page] -> see commands
➥ sim [message] -> talk to bot
➥ callad [message] -> report any problem encountered
➥ help [command] -> information and usage of command\n\nThank you for using my bot\n\nBot Developer: https://www.facebook.com/itssmekylebaitit`,
 attachment: await global.utils.getStreamFromURL("\n")
 });
 }
 }
}
