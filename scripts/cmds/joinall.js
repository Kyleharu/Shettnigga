module.exports = {
  config: {
    name: "joinall",
    aliases: ['addmeall', 'joinmeall'],
    version: "1.0",
    author: "Aesther", Thakuri",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Add user to all support groups",
    },
    longDescription: {
      en: "This command adds the user to all support groups where the bot exists",
    },
    category: "owner",
    guide: {
      en: "To use this command, simply type !joinall.",
    },
  },

  onStart: async function ({ api, args, message, event }) {
    const userThreadID = event.threadID;
    const userID = event.senderID;
    const userInfo = await api.getUserInfo(userID);
    const userThreadInfo = await api.getThreadInfo(userThreadID);
    const userParticipantIDs = userThreadInfo.participantIDs;
    let count = 0;

    // Get all threads where the bot exists
    const threads = await api.getThreadsInfo(userParticipantIDs);

    threads.forEach(async (thread) => {
      const supportGroupId = thread.threadID;

      if (!userParticipantIDs.includes(supportGroupId) && supportGroupId !== userThreadID) {
        // Add user to support group
        api.addUserToGroup(userID, supportGroupId, (err) => {
          if (err) {
            console.error("Failed to add user to support group:", err);
            api.sendMessage(userInfo[userID].name + ", I cannot add you to the group because your ID is not authorized to request a message or your account is private. Please add me and try again.", supportGroupId);
          } else {
            count++;
            api.sendMessage(userInfo[userID].name + ", I have added you to the support group " + supportGroupId, supportGroupId);
          }
        });
      }
    });

    setTimeout(() => {
      api.sendMessage(userInfo[userID].name + ", you have been added to " + count + " support groups.", userThreadID);
    }, 2000);
  },
};