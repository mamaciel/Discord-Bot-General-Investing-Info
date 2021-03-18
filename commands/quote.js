const http = require("https");
const formatter = new Intl.NumberFormat('en');

module.exports = {
    name: 'quote',
    description: "This command will show you a company quote overview",


    execute(message, args){
		let splitMessage = message.content.split(" ");

		if (message.content.includes(splitMessage[1])){
			message.reply('hold up, let me load $'+ splitMessage[1].toUpperCase() + ' up!');

			const options = {
				"method": "GET",
				"hostname": "alpha-vantage.p.rapidapi.com",
				"port": null,
				"path": "/query?function=GLOBAL_QUOTE&symbol=" + splitMessage[1].toUpperCase(),
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
				message.channel.send("**Symbol: **" + bodyobj["Global Quote"]["01. symbol"] +
				"\n**Previous open: **" + bodyobj["Global Quote"]["02. open"] +
				"\n**Previous close: **" + bodyobj["Global Quote"]["08. previous close"] +
				"\n**Previous high: **" + bodyobj["Global Quote"]["03. high"] +
				"\n**Previous low: **" + bodyobj["Global Quote"]["04. low"] +
				"\n**Previous volume (during open hours): **" + formatter.format(bodyobj["Global Quote"]["06. volume"]));
				}); 
			});
			
			req.end();   

		}

		else
			message.channel.send('Sorry, I do not understand your command. Please make sure to insert a ticker.');
    }
}