var should = require('should');

var autorobo = require('../index.js');

describe('autorobo', function () {
	describe('key', function () {
		describe('VK_*', function () {
			it('should have initialized virtual key codes', function () {
				autorobo.key.should.have.property("VK_A");
				autorobo.key.should.have.property("VK_0");
				autorobo.key.should.have.property("VK_PAGE_DOWN");
			});
		});

		describe('#press() and #release()', function () {
			it('should press and release key (controlling)', function () {
				autorobo.key.press(autorobo.key.VK_PAGE_DOWN);
				autorobo.key.release(autorobo.key.VK_PAGE_DOWN);
			});
		});

		describe('#stroke()', function () {
			it('should keystroke (controlling)', function () {
				autorobo.key.stroke(autorobo.key.VK_PAGE_DOWN);
			});

			it('should keystroke and hold for a certain time (controlling)', function (done) {
				var lastTime = Date.now();
				
				autorobo.key.stroke(autorobo.key.VK_PAGE_DOWN, 1000);
				
				var now = Date.now();

				// within a margin of 50 milliseconds is good enough
				Math.abs(now - lastTime - 1000).should.be.lessThan(50);

				done();
			});
		});

	});
});
