module.exports = {
		config: {
				name: "noprefixmsg1",
				version: "1.0",
				author: "Loid Butter",
				countDown: 1,
				role: 0,
				category: "No Prefix",
		},
		onReply: async function ({ event, message }) {
				const triggerPhrases = ["Ai", "hello", "kyle", "bot"];
				if (event.body && triggerPhrases.includes(event.body.toLowerCase())) {
						return () => {
								return message.reply("Hello, there how may I help you today?");
						}
				}
		},

		onStart: async function ({  }) {
		}
};
