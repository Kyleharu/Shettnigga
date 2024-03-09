const axios = require("axios");
module.exports = {
  config: {
    name: "test", // sdxl
    category: "ai",
  },
  onStart: async function ({ message, api, args, event }) {
    const text = args.join(' ');
    const [prompt, model] = text.split('|').map((text) => text.trim());
   let puti = model || "2";
 const lado = `https://sdxl.otinxsandeep.repl.co/sdxl?prompt=${prompt}&model=${puti}`;

    message.reply({
      attachment: await global.utils.getStreamFromURL(lado)
    });
  }
};