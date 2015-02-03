var shortURLPromise, short = require('short');





exports.shortIt = function(obj, cb) {

 
	short.connect('mongodb://192.168.3.140/short');

	short.connection.on('error', function(error) {
		throw new Error(error);
	});

	// promise to generate a shortened URL.
	var shortURLPromise = short.generate({
		URL: 'http://nodejs.org/1'
	});

	// gets back the short url document, and then retrieves it
	shortURLPromise.then(function(mongodbDoc) {
		short.retrieve(mongodbDoc.hash).then(function(result) {
			console.log('>> retrieve result:');
			console.log(result);
			process.exit(0);
		}, function(error) {
			if (error) {
				throw new Error(error);
			}
		});
	}, function(error) {
		if (error) {
			throw new Error(error);
		}
	});
}