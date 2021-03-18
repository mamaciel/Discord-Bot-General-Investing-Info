const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = '!';

const fs = require('fs');

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command)
}

client.once('ready', () => {
    console.log(`${client.user.tag}`,'is online!');
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    message.content.toLowerCase();

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'description'){
        client.commands.get('description').execute(message, args);
    }
    else if (command === 'help'){
        client.commands.get('help').execute(message, args);
    }
    else if (command === 'quote'){
        client.commands.get('quote').execute(message, args);
    }
    else if (command === 'dividend'){
        client.commands.get('dividend').execute(message, args);
    }
    else if (command === 'overview'){
        client.commands.get('overview').execute(message, args);
    }
    else if (command === 'income'){
        client.commands.get('income').execute(message, args);
    }
    else if (command === 'history'){
        client.commands.get('history').execute(message, args);
    }
});

client.login("YOUR_API_KEY_HERE");
