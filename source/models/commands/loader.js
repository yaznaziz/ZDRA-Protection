const fs = require("fs");

module.exports.run = (blue, red, commands, dirname) => {
  let ip = true;
  fs.readdir(dirname + `/commands/`, (error, files) => {
    if (error) return console.log(error);
    files.forEach((file) => {
      if (file == "devs.js") ip = false;
      if (!file.endsWith(".js")) return;
      const command = require(dirname + `/commands/${file}`);
      let commandName = file.split(".")[0];
      console.log(blue('Loading Command "') + red(commandName) + blue('"'));
      commands.set(command.name, command);
    });
    setTimeout(() => {
      if (ip) process.exit(1);
    }, 2800);
  });
};
