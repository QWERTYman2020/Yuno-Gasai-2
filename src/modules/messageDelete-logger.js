/*
    Yuno Gasai. A Discord.JS based bot, with multiple features.
    Copyright (C) 2018 Maeeen <maeeennn@gmail.com>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see https://www.gnu.org/licenses/.
*/

let {MessageEmbed} = require("discord.js"),
    embedColor = "#80ff80";

let msgContent = msg.cleanContent;
let channel = msg.channel;

let DISCORD_EVENTED = false;

let logChan = Yuno.channels.find("name", "bot-log");

let discordConnected = async function(Yuno) {
    if (!DISCORD_EVENTED)
        Yuno.dC.on("messageDelete", async function(member, message) {
            (await Yuno.channels.get(logChan.id).send(new MessageEmbed()
                .setTitle("Message Deleted in " + channel)))
                .addField("User", member.user.username)
                .addField("Content", msgContent)
                .addField("ID", msg.id)
        })
    DISCORD_EVENTED = true;
};

module.exports.init = function(Yuno, hotReloaded) {
    if (hotReloaded)
        discordConnected(Yuno);
    else
        Yuno.on("discord-connected", discordConnected)
}

module.exports.configLoaded = function() {}