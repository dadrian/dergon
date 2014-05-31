var Twit = require('twit');
var translate = require('./translate');

var config = {
    consumer_key: 'SCl6mCEqJ8AsCIhX1G0qUtofy',
    consumer_secret: '1welgkV6KG3GZlwMc2A8bzOHIOG0slbO8DTJs6ev1a1DdjIZat',
    access_token: '2523419953-FwrzMHmqwR26gtOVXDUfCfid6Hd5HhCKrIvZ3BC',
    access_token_secret: 'jjlUCsXuIiqcM5H4Teawh4tYBdOtsg89Qv4UbKu34ybaP'
};

var Bot = require('./bot');
var T = new Twit(config);
var bot = new Bot(config);

var DA_ID = 20747741;
var TEST_ID = 20807505;

var stream = T.stream('statuses/filter', { follow: [ DA_ID ] });
stream.on('tweet', function(tweet) {
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

