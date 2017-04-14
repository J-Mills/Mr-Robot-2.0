// Initialization
const config = require('./config.json');
// Import the discord.js module
try {
  var discord = require('discord.js');
} catch (e) {
  console.log(e.stack);
  console.log(process.version);
  console.log('Please run npm install and ensure it passes with no errors!');
  process.exit;
}
// Create an instance of the Discord Client, and call it bot
var bot = new discord.Client();

// Console logs
console.log('Starting Mr Robot\nNode Version: ' + process.version + '\nDiscord.js version: ' + discord.version);

// the ready event means
// Bot is online
bot.on('ready', () => {
  console.log('I am ready!');
  bot.user.setGame('!help');
});

bot.on('guildMemberAdd', member => {
  let guild = member.guild;
  guild.defaultChannel.sendMessage(`Welcome, ${member.user} to this server!`);
});

bot.on('guildMemberUpdate', member => {
  let guild = member.guild;
  guild.defaultChannel.sendMessage(`${member}'s new role is ${role}`);
});

bot.on('guildCreate', guild => {
  console.log(`New guild added : ${guild.name}, owned by ${guild.ownder.user.username}`);
});

// Message content and replies
bot.on('message', msg => {
// Commands that don't use a prefix
  if (msg.content.includes('(╯°□°）╯︵ ┻━┻')) {
    msg.channel.sendMessage(': ┬─┬﻿ ノ( ゜-゜ノ)');
  }
  if (msg.content.includes('wew lad')) {
    msg.channel.sendMessage('w e w l a d');
  }
// Exit and stop if there's no prefix
  if (!msg.content.startsWith(config.prefix)) return;
// Exit if the author of a message is a bot
  if (msg.author.bot) return;
// Command can now be used instead of typing msg.content.startsWith
  let command = msg.content.split(' ')[0];
  command = command.slice(config.prefix.length);

  let args = msg.content.split(' ').slice(1);

  if (command === 'ping') {
    let modRole = msg.guild.roles.find('name', 'Ladmin');
    if (msg.member.roles.has(modRole.id)) {
      msg.channel.sendMessage('pong!');
    } else {
      msg.reply('You do not have permission to use this command!');
    }
  }

  if (command === 'say') {
    msg.channel.sendMessage(args.join(' '));
  }

  if (command === 'add') {
    let numArray = args.map(n => parseInt(n));
    let total = numArray.reduce((prev, current) => prev + current);
    msg.channel.sendMessage(total);
  }

// Moderator Controls
  if (command === 'kick') {
    let modRole = msg.guild.roles.find('name', 'Ladmin');
    if (!msg.member.roles.has(modRole.id)) {
      return msg.reply('You do not have permission to use this command!');
    }
    if (msg.mentions.users.size === 0) {
      return msg.reply('Please mention a user to kick.');
    }
    let kickMember = msg.guild.member(msg.mentions.users.first());
    if (!kickMember) {
      return msg.reply('That user does not exist on this server.');
    }
    if (!msg.guild.member(bot.user).hasPermission('KICK_MEMBERS')) {
      return msg.reply('I don\'t have the permissions (KICK_MEMBER) to do this.');
    }
    kickMember.kick().then(member => {
      msg.reply(`${member.user.username} was successfully kicked from the server.`);
    }).catch();
  }
/*
// Help Menu for the bot
  if (msg.content.includes(prefix + 'help')) {
    msg.channel.sendMessage(
      'Here is a list of commands; !ping, !ayylmao, !avatar - I\'m still working on formatting lol.'
    );
  }

// Check if the bot is alive with these
  if (command === 'ping') {
    msg.channel.sendMessage('pong');
    console.log('USER ID GOES HERE');
  } else if (msg.content.startsWith(prefix + 'foo')) {
    msg.channel.sendMessage('bar!');
  }

  if (msg.content.startsWith(prefix + 'YouTube')) {
    msg.channel.sendMessage('In order to use the "Youtube" function, please forward one easy payment of 49.99 to Jack Mills');
  }

  if (msg.content.startsWith(prefix + 'insult')) {
    msg.channel.sendMessage('Your mother was a hamster, and your father smelt of elderberries!');
  }

  if (msg.content.startsWith(prefix + 'ayylmao')) {
    msg.channel.sendFile('http://i.imgur.com/i6Ks73p.png');
  }

  if (msg.content.startsWith(prefix + 'arma')) {
    msg.channel.sendFile('https://grandtheftarma.com/uploads/guide/controloverview.png');
  }

// Send the user their discord avatar

  if (msg.content.startsWith(prefix + 'avatar')) {
    msg.reply(msg.author.avatarURL);
  }

  if (msg.content.includes(prefix + 'role')) {
    msg.reply(msg.author.roleName);
  }*/
});

bot.on('error', e => { console.error(e); });

bot.login(config.token);
