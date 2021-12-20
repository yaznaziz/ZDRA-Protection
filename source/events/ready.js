const { red, blue, green } = require("chalk");

module.exports = async (client) => {
  try {
    require("../functions/readyFunction")
      .get(client, red, blue)
      .catch(() => {});
  } catch {
    console.log("");
  }
};
