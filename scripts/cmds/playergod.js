const fs = require('fs');

module.exports = {
  config: {
    name: "fyt",
    version: "1.0",
    author: "Mr perfect",
    countDown: 0,
    role: 0,
    shortDescription: {
      en: "This is a short description of the command."
    },
    longDescription: {
      en: "This is a long description of the command."
    },
    category: "Fight",
    guide: {
      en: "This is a guide for using the command."
    }
  },

  onStart: () => {
    console.log("Command initialized successfully.");
  },

  init: () => {
    const filePath = 'scripts/cmds/perfectfight.txt'; // Replace with the actual path to the text file
    const interval = 500; // Interval in milliseconds (0.5 seconds)

    const sendRandomText = () => {
      const lines = fs.readFileSync(filePath, 'utf8').split('\n');
      const randomIndex = Math.floor(Math.random() * lines.length);
      const randomLine = lines[randomIndex].trim();

      // Replace this with your logic to send the text
      console.log(randomLine);
    };

    sendRandomText(); // Send initial text immediately
    setInterval(sendRandomText, interval);
  }
};

// Initialize the command
module.exports.onStart();
module.exports.init();


