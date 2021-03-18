 const http = require("https");

module.exports = {
    name: 'description',
    description: "This command will show you a company description",

    execute(message, args){
		let splitMessage = message.content.split(" ");

		if (message.content.includes(splitMessage[1])){

			const options = {
				"method": "GET",
				"hostname": "alpha-vantage.p.rapidapi.com",
				"port": null,
				"path": "/query?function=OVERVIEW&symbol=" + splitMessage[1].toUpperCase(),
				//"path": "/query?function=GLOBAL_QUOTE&symbol=" + splitMessage[1].toUpperCase(),
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
				
				//message.channel.send(body.toString());
				bodyobj = JSON.parse(body);
				
				//message.channel.send(bodyobj["Global Quote"]["05. price"]);
			var descrip = bodyobj["Description"];
				
					if(descrip === undefined || descrip.length == 0){
						message.channel.send("Sorry, no information available. Try a different ticker!")
						console.log("User tried to search $" + splitMessage[1].toUpperCase() + " but there was no information available")
					}

					else if(descrip.length > 1935){
						message.reply('Hold up, let me load $'+ splitMessage[1].toUpperCase() + ' up!');
						message.channel.send("**Description: **\n" + bodyobj["Description"].substr(0, 1935))
						message.channel.send(descrip.substr(1935))
					}

					else if (descrip.length < 1935){
						message.channel.send("**Description: test**\n" + bodyobj["Description"]);
					}
				}); 
			});
			
			req.end();   

		}

		else
			message.channel.send('Sorry, I do not understand your command.');
    }
}