const {
  Client,
  CommandInteraction,
  MessageButton,
  MessageActionRow,
} = require("discord.js");
const db = require("quick.db");

/**
 *
 * @param {Client} client
 * @param {CommandInteraction} interaction
 * @param {String[]} args
 */

module.exports = async (client, interaction) => {
  try {
    if (interaction.isButton()) {
      interaction.deferUpdate();
      if (interaction.customId == "x") {
        interaction
          .followUp({
            content: "> ❌ **All Bot Protection Settings Is Off**",
            embeds: [],
            components: [],
            ephemeral: true,
          })
          .catch(() => {});
        db.delete(`AntiLinksArray_${interaction.guild.id}`);
        db.delete(`AntiSwearArray_${interaction.guild.id}`);
        db.delete(`AntiLinks_${interaction.guild.id}`);
        db.delete(`AntiSwear_${interaction.guild.id}`);
        db.delete(`AntiBots_${interaction.guild.id}`);
        db.delete(`AntiSpam_${interaction.guild.id}`);
        db.delete(`AntiTokens_${interaction.guild.id}`);
        db.delete(`AntiTokensTime_${interaction.guild.id}`);
        db.delete(`RoleCreateToggle_${interaction.guild.id}`);
        db.delete(`RoleCreate_${interaction.guild.id}`);
        db.delete(`RoleDeleteToggle_${interaction.guild.id}`);
        db.delete(`RoleDelete_${interaction.guild.id}`);
        db.delete(`ChannelCreateToggle_${interaction.guild.id}`);
        db.delete(`ChannelCreate_${interaction.guild.id}`);
        db.delete(`ChannelDeleteToggle_${interaction.guild.id}`);
        db.delete(`ChannelDelete_${interaction.guild.id}`);
        db.delete(`MembersBanToggle_${interaction.guild.id}`);
        db.delete(`MemebersBan_${interaction.guild.id}`);
      } else if (interaction.customId == "full") {
        interaction
          .followUp({
            content: "> 🔓 **All Bot Protection Settings Is On**",
            embeds: [],
            components: [],
            ephemeral: true,
          })
          .catch(() => {});
        db.set(`AntiLinksArray_${interaction.guild.id}`, {
          data: ["https", "http", "www", "discord.gg"],
        });
        db.set(`AntiSwearArray_${interaction.guild.id}`, {
          data: ["fuck", "pussy", "نيك", "كس"],
        });
        db.set(`AntiLinks_${interaction.guild.id}`, "on");
        db.set(`AntiSwear_${interaction.guild.id}`, "on");
        db.set(`AntiBots_${interaction.guild.id}`, "on");
        db.set(`AntiSpam_${interaction.guild.id}`, "on");
        db.set(`AntiTokens_${interaction.guild.id}`, "on");
        db.set(`AntiTokensTime_${interaction.guild.id}`, 120);
        db.set(`RoleCreateToggle_${interaction.guild.id}`, "on");
        db.set(`RoleCreate_${interaction.guild.id}`, "3");
        db.set(`RoleDeleteToggle_${interaction.guild.id}`, "on");
        db.set(`RoleDelete_${interaction.guild.id}`, "3");
        db.set(`ChannelCreateToggle_${interaction.guild.id}`, "on");
        db.set(`ChannelCreate_${interaction.guild.id}`, "3");
        db.set(`ChannelDeleteToggle_${interaction.guild.id}`, "on");
        db.set(`ChannelDelete_${interaction.guild.id}`, "3");
        db.set(`MembersBanToggle_${interaction.guild.id}`, "on");
        db.set(`MemebersBan_${interaction.guild.id}`, "3");
      } else if (interaction.customId == "niro") {
        interaction
          .followUp({
            content: "> 🔒 **NIRO Protection is active**",
            embeds: [],
            components: [],
            ephemeral: true,
          })
          .catch(() => {});
        db.set(`AntiLinksArray_${interaction.guild.id}`, {
          data: ["https", "http", "www", "discord.gg"],
        });
        db.set(`AntiSwearArray_${interaction.guild.id}`, {
          data: ["fuck", "pussy", "نيك", "كس"],
        });
        db.set(`AntiLinks_${interaction.guild.id}`, "on");
        db.set(`AntiSwear_${interaction.guild.id}`, "on");
        db.set(`AntiBots_${interaction.guild.id}`, "on");
        db.set(`AntiSpam_${interaction.guild.id}`, "on");
        db.set(`AntiTokens_${interaction.guild.id}`, "on");
        db.set(`AntiTokensTime_${interaction.guild.id}`, 760);
        db.set(`RoleCreateToggle_${interaction.guild.id}`, "on");
        db.set(`RoleCreate_${interaction.guild.id}`, "1");
        db.set(`RoleDeleteToggle_${interaction.guild.id}`, "on");
        db.set(`RoleDelete_${interaction.guild.id}`, "1");
        db.set(`ChannelCreateToggle_${interaction.guild.id}`, "on");
        db.set(`ChannelCreate_${interaction.guild.id}`, "1");
        db.set(`ChannelDeleteToggle_${interaction.guild.id}`, "on");
        db.set(`ChannelDelete_${interaction.guild.id}`, "1");
        db.set(`MembersBanToggle_${interaction.guild.id}`, "on");
        db.set(`MemebersBan_${interaction.guild.id}`, "1");
        // niro
        db.set(`NIRO_Protection_${interaction.guild.id}`, "on");
      }
    }
    if (interaction.isCommand()) {
      let settings = db.fetch(`Settings_${interaction.guild.id}`);
      if (settings == null)
        return db.set(`Settings_${interaction.guild.id}`, {
          prefix: require("../../config/bot.json").mainPrefix,
          lang: require("../../config/bot.json").mainLang,
          admins: [`${require("../../config/bot.json").mainAdmin}`],
        });
      let lang = settings.lang;
      let admins = settings.admins;

      if (lang == "en") {
        if (!admins.includes(interaction.user.id))
          return interaction.reply({
            content: "> :x: **You Are Not From The Allowed Admins**",
            ephemeral: true,
          });
      } else if (lang == "ar") {
        if (!admins.includes(interaction.user.id))
          return interaction.reply({
            content: "> :x: **انت لست من ادمنز البوت**",
            ephemeral: true,
          });
      }

      const cmd = client.slashCommands.get(interaction.commandName);
      if (!cmd) return console.log("?");
      const args = [];
      for (let option of interaction.options.data) {
        if (option.type === "SUB_COMMAND") {
          if (option.name) args.push(option.name);
          option.options?.forEach((x) => {
            if (x.value) args.push(x.value);
          });
        } else if (option.value) args.push(option.value);
      }

      interaction.member = interaction.guild.members.cache.get(
        interaction.user.id
      );
      cmd.run(client, interaction, args);

      if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
      }
    }
  } catch (err) {
    console.log(err);
  }
};
