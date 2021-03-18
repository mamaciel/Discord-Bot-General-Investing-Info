const http = require("https");
const formatter = new Intl.NumberFormat('en');
const formatPercentage = new Intl.NumberFormat('en', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

module.exports = {
    name: 'history',
    description: "This command will show you a company's income statement",

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
                message.channel.send("**Beta: **\n$" + bodyobj["Beta"] +
                "\n**52-Week High: **\n$" + bodyobj["52WeekHigh"] 

                 )}); 
			});
			
			req.end();   

		}

		else
			message.channel.send('Sorry, I do not understand your command.');
    }
}