const db = require("quick.db");

module.exports = async (client, oldMessage, newMessage) => {
  try {
    require("../functions/messageUpdateFunction")
      .get(oldMessage, newMessage, db)
      .catch(() => {});
  } catch {
    console.log("");
  }
};
