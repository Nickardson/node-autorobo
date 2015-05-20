var should = require('should');

var autorobo = require('../index.js');

describe('autorobo', function () {
	describe('#sleep', function () {
		it('should sleep for a time', function (done) {
			var lastTime = Date.now();
			autorobo.sleep(1000);

			var now = Date.now();

			// within a margin of 50 milliseconds is good enough
			Math.abs(now - lastTime - 1000).should.be.lessThan(50);

			done();
		});
	});
});
