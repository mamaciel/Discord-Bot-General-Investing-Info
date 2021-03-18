const http = require("https");

module.exports = {
    name: 'dividend',
    description: "This command will show you a company dividend information",

    execute(message, args){
		let splitMessage = message.content.split(" ");

		if (message.content.includes(splitMessage[1])){
			message.reply('hold up, let me load $'+ splitMessage[1].toUpperCase() + ' up!');

			const options = {
				"method": "GET",
				"hostname": "alpha-vantage.p.rapidapi.com",
				"port": null,
				"path": "/query?function=OVERVIEW&symbol=" + splitMessage[1].toUpperCase(),
				"headers": {
					"x-rapidapi-key": "YOUR_API_KEY_HERE",
					"x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
					"useQueryString": true
				}
			}; 
			
			var body = "";
			var chunks = [];
			
			 const req = http.request(options, function (res) {
					chunks = [];
			
				res.on("data", function (chunk) {
					chunks.push(chunk);
				});
			
				 res.on("end", function () {
					body = Buffer.concat(chunks);
				
				bodyobj = JSON.parse(body);
                message.channel.send("**Dividend per share: **\n" + bodyobj["DividendPerShare"] + 
                "\n**Dividend yield: **\n" + bodyobj["DividendYield"] +
                "\n**Next dividend date: **\n" + bodyobj["DividendDate"] + 
                "\n**Last dividend date: **\n" + bodyobj["ExDividendDate"]);
				}); 
			});
			
			req.end();   

		}

		else
			message.channel.send('Sorry, I do not understand your command.');
    }
}