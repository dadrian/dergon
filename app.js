var Twit = require('twit');
var translate = require('./translate');

var config = {
    consumer_key: 'PDGWMvOfvGD3hKLoFr3vGk5na',
    consumer_secret: '4A2FCcXZNpdMD32oJLsrxQXjaO1jrV8pwCoPUVYhSXWTcDEfkM',
    access_token: '2523419953-WbKmHAnLdzq1SK0d0LMQJKhyEFT89CEyVnGEIe8',
    access_token_secret: 'gBcZBIEQ0syM6nNstnoNvcGo784jXKfCi8wk2OFDjFpLh'
};

var Bot = require('./bot');
var T = new Twit(config);
var bot = new Bot(config);

var DA_ID = 20747741;
var TEST_ID = 20807505;

var stream = T.stream('statuses/filter', { follow: [ DA_ID ] });
stream.on('tweet', function(tweet) {
	//console.log(tweet);
	if (tweet.user.id != DA_ID) {
		return;
	}
	console.log(tweet);
	// Skip @replies
	var text = tweet.text;
	if (text.length == 0) {
		return;
	}
	if (text[0] == '@' || text[0] == '.') {
		return;
	}

	var words = text.split(/\s+/);
	var translated = words.map(translate).join(' ');
        if (translated.length > 140) {
            translated = translated.substring(0, 140);
        } 
	bot.tweet(translated, function(err, data, response) {
		if (err) {
			console.log(err);
		} else {
			console.log('Tweeted "' + translated + '"');
		}
		//console.log(data);
		//console.log(response);
	});
});

