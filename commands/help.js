module.exports = {
    name: 'help',
    description: "This command will show you a list of bot commands",

    execute(message, args){
        message.channel.send(':wave: Hello '+ message.author.username + '! My commands are: ' +  
        '\n**!description + (ticker)** \n will show you a company description'+
        '\n**!quote + (ticker)** \n will show you a global quote from previous trading day'+
        '\n**!dividend + (ticker)** \n will show you a company dividend info'+
        '\n**!income + (ticker)** \n will show you a company\'s financials');
    }
}