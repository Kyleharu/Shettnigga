const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = {
  config: {
    name: 'test',
    version: '1.0',
    author: 'leeza',
    role: 2,
    category: 'utility',
    shortDescription: {
      en: 'Executes shell commands.',
    },
    longDescription: {
      en: 'Executes shell commands and returns the output.',
    },
    guide: {
      en: '{pn} [command]',
    },
  },
  onStart: async function ({ api, args, message, event }) {
    const command = args.join(' ');

    if (!command) {
      return message.reply('Please provide a command to execute.');
    }

    try {
      const { stdout, stderr } = await exec(command);

      if (stderr) {
        console.error(`Command execution resulted in an error: ${stderr}`);
        return message.reply(`Command execution resulted in an error: ${stderr}`);
      }

      console.log(`Command executed successfully:\n${stdout}`);
      message.reply(`Command executed successfully:\n${stdout}`);
    } catch (error) {
      console.error(error);
      message.reply(`Error: ${error.message}`);
    }
  },
};