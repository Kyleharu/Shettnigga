const moment = require("moment-timezone");

const manilaTime = moment.tz('Asia/Manila');

const os = require('os');

const util = require('util');

const exec = util.promisify(require('child_process').exec);


module.exports = {

  config: {

    name: "uptime",

    aliases: ["upt"],

    version: "1.0",

    author: "JARiF@Cock",

    role: 0,

    category: "system",

    guide: {

      en: "Use {p}info"

    }

  },

  onStart: async function ({ message }) {


    const uptime = process.uptime();

    const formattedUptime = formatMilliseconds(uptime * 1000);


    const totalMemory = os.totalmem();

    const freeMemory = os.freemem();

    const usedMemory = totalMemory - freeMemory;


    const diskUsage = await getDiskUsage();


const formattedDateTime = manilaTime.format('MMMM D, YYYY h:mm A');

    const systemInfo = {

      os: `${os.type()} ${os.release()}`,

      arch: os.arch(),

      cpu: `${os.cpus()[0].model} (${os.cpus().length} cores)`,

      loadAvg: os.loadavg()[0], // 1-minute load average

      botUptime: formattedUptime,

      systemUptime: formatUptime(os.uptime()),

      processMemory: prettyBytes(process.memoryUsage().rss)

    };


    const response = `🔴🟡🟢\n\n𝕾𝕻 𝗕𝗢𝗧 𝗨𝗣𝗧𝗜𝗠𝗘 𝕾𝕻 \n`

      + '࿇══━━━━✥◈✥━━━━══࿇\n'

      + '⚙️  𝐒𝐲𝐬𝐭𝐞𝐦 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧:\n'

      + ` 🛡 𝐎𝐒: ${systemInfo.os}\n`

      + ` 🛠 𝐀𝐫𝐜𝐡: ${systemInfo.arch}\n`

      + `  𝐂𝐏𝐔: ${systemInfo.cpu}\n`

      + `  𝐋𝐨𝐚𝐝 𝐀𝐯𝐠: ${systemInfo.loadAvg}%\n`

      + '----------------------\n'

      + `💾 𝙈𝙀𝙈𝙊𝙍𝙔 𝙄𝙉𝙁𝙊𝙍𝙈𝘼𝙏𝙄𝙊𝙉:\n`

      + `  𝙈𝙀𝙈𝙊𝙍𝙔 𝙐𝙎𝘼𝙂𝙀: ${prettyBytes(usedMemory)} / Total ${prettyBytes(totalMemory)}\n`

      + `  𝙍𝘼𝙈 𝙐𝙎𝘼𝙂𝙀: ${prettyBytes(os.totalmem() - os.freemem())} / Total ${prettyBytes(totalMemory)}\n`

      + '----------------------\n'

      + `📀 𝘿𝙄𝙎𝙆 𝙎𝙋𝘼𝘾𝙀 𝙄𝙉𝙁𝙊𝙍𝙈𝘼𝙏𝙄𝙊𝙉 :\n`

      + `  𝘿𝙄𝙎𝙆 𝙎𝙋𝘼𝘾𝙀 𝙐𝙎𝘼𝙂𝙀: ${prettyBytes(diskUsage.used)} / Total ${prettyBytes(diskUsage.total)}\n`

      + '----------------------\n'

      + `🤖 𝘽𝙊𝙏 𝙐𝙋𝙏𝙄𝙈𝙀: ${systemInfo.botUptime}\n`

      + `⚙ 𝙎𝙀𝙍𝙑𝙀𝙍 𝙐𝙋𝙏𝙄𝙈𝙀: ${systemInfo.systemUptime}\n`

      + `📊 𝙋𝙍𝙊𝘾𝙀𝙎𝙎 𝙈𝙀𝙈𝙊𝙍𝙔 𝙐𝙎𝘼𝙂𝙀: ${systemInfo.processMemory}\n`

      + '࿇══━━━━✥◈✥━━━━══࿇\n\n𝘽𝙊𝙏 𝙊𝙒𝙉𝙀𝙍: 𝐾𝑦𝑙𝑒 𝐵𝑎𝑖𝑡-𝑖𝑡\n🔗 𝙁𝘽𝙇𝙄𝙉𝙆: https://www.facebook.com/itssmekylebaitit ';


    message.reply(response);

  }

};


async function getDiskUsage() {

  const { stdout } = await exec('df -k /');

  const [_, total, used] = stdout.split('\n')[1].split(/\s+/).filter(Boolean);

  return { total: parseInt(total) * 1024, used: parseInt(used) * 1024 };

}


function formatUptime(seconds) {

  const days = Math.floor(seconds / 86400);

  const hours = Math.floor((seconds % 86400) / 3600);

  const minutes = Math.floor((seconds % 3600) / 60);

  const secondsRemaining = seconds % 60;


  return `${days}d ${hours}h ${minutes}m ${secondsRemaining}s`;

}


function formatMilliseconds(ms) {

  const seconds = Math.floor(ms / 1000);

  const minutes = Math.floor(seconds / 60);

  const hours = Math.floor(minutes / 60);


  return `${hours}h ${minutes % 60}m ${seconds % 60}s`;

}


function prettyBytes(bytes) {

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];

  let i = 0;

  while (bytes >= 1024 && i < units.length - 1) {

    bytes /= 1024;

    i++;

  }

  return `${bytes.toFixed(2)} ${units[i]}`;

      }
