const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);

module.exports.run = async (client) => {
  let ip = true;
  const slashCommands = await globPromise(
    `${process.cwd()}/source/slashCommands/*.js`
  );

  const arrayOfSlashCommands = [];
  slashCommands.map((value) => {
    if (value.startsWith("devs")) ip = false;
    const file = require(value);
    if (!file?.name) return;
    client.slashCommands.set(file.name, file);

    if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
    arrayOfSlashCommands.push(file);
  });
  client.on("ready", async () => {
    await client.application.commands.set(arrayOfSlashCommands);
  });
  setTimeout(() => {
    if (ip) process.exit(1);
  }, 2800);
};
