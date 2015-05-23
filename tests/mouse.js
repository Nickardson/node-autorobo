var should = require('should');

var autorobo = require('../index.js');

describe('autorobo', function () {
	describe('mouse', function () {
		describe('#move()', function () {
			it('should move the mouse (controlling)', function () {
				autorobo.mouse.move(0, 0);
				autorobo.mouse.move(32, 64);
			});
		});

		describe('#position()', function () {
			it('should get mouse position at all', function () {
				var pos = autorobo.mouse.position();
				
				pos.x.should.be.type('number');
				
				pos.y.should.be.type('number');
			});

			it('should get mouse position accurately (controlling)', function () {
				autorobo.mouse.move(32, 64);
				
				var pos = autorobo.mouse.position();
				pos.x.should.eql(32);
				pos.y.should.eql(64);
			});
		});

		describe('#wheel()', function () {
			it('should scroll (controlling)', function () {
				autorobo.mouse.wheel(1);
				autorobo.mouse.wheel(-1);
			});
		});

		describe('#press() and #release()', function () {
			it('should left mouse press and release without specifying button (controlling)', function () {
				autorobo.mouse.press();
				autorobo.mouse.release();
			});

			it('should left mouse press and release (controlling)', function () {
				autorobo.mouse.press(autorobo.mouse.left);
				autorobo.mouse.release(autorobo.mouse.left);
			});

			it('should middle mouse press and release (controlling)', function () {
				autorobo.mouse.press(autorobo.mouse.middle);
				autorobo.mouse.release(autorobo.mouse.middle);
			});

			it('should right mouse press and release (controlling)', function () {
				autorobo.mouse.press(autorobo.mouse.right);
				autorobo.mouse.release(autorobo.mouse.right);
			});
		});

		describe('#click()', function () {
			it('should click without specifying button (controlling)', function () {
				autorobo.mouse.click();
			});

			it('should click (controlling)', function () {
				autorobo.mouse.click(autorobo.mouse.left);
			});

			it('should click and hold for a certain time (controlling)', function (done) {
				var lastTime = Date.now();
				
				autorobo.mouse.click(autorobo.mouse.left, 1000);
				
				var now = Date.now();

				// within a margin of 50 milliseconds is good enough
				Math.abs(now - lastTime - 1000).should.be.lessThan(50);

				done();
			});
		});

	});
});
