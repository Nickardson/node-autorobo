/**
 * Being primarily a mouse/keyboard library, some tests involve moving the mouse and inputting keys.
 * So as not to wreck your computer, tests that control the mouse and keyboard are by default excluded by "--invert --fgrep controlling" in the package.json.
 *
 * Remove the "--invert" to run the tests which will move the mouse and input keys.
 */

var should = require('should');

var autorobo = require('./index.js');

describe('autorobo', function () {
	describe('screen', function () {
		describe('#size()', function () {
			it('should measure screen size without error', function () {
				var size = autorobo.screen.size();
				
				size.should.have.property('width');
				size.width.should.be.above(0);
				
				size.should.have.property('height');
				size.height.should.be.above(0);
			});
		});

		describe('#rect()', function () {
			it('should create a rectangle', function () {
				autorobo.screen.rect(0, 0, 0, 0);
			});
			
			it('should create a rectangle with the proper dimensions', function () {
				var r = autorobo.screen.rect(10, 20, 30, 40);

				r.x.should.eql(10);
				r.y.should.eql(20);
				r.width.should.eql(30);
				r.height.should.eql(40);
			});
		});

		describe('#shoot()', function () {
			it('should capture the whole screen', function () {
				var size = autorobo.screen.size();
				var capture = autorobo.screen.shoot();
				
				capture.getWidthSync().should.eql(size.width);
				capture.getHeightSync().should.eql(size.height);
			});

			it('should capture the whole screen when told a specific size', function () {
				var size = autorobo.screen.size();
				var capture = autorobo.screen.shoot(size);
				
				capture.getWidthSync().should.eql(size.width);
				capture.getHeightSync().should.eql(size.height);
			});
			
			it('should capture a portion of the screen', function () {
				var size = autorobo.screen.rect(40, 40, 300, 300)
				var capture = autorobo.screen.shoot(size);
				
				capture.getWidthSync().should.eql(size.width);
				capture.getHeightSync().should.eql(size.height);
			});
		});

		describe("#capture", function () {
			it('should capture and save without error', function () {
				autorobo.screen.capture("test.png");
			});
			it('should capture and save without error with size', function () {
				autorobo.screen.capture("test.png", autorobo.screen.rect(40, 40, 300, 300));
			});
		});

		describe("#save", function () {
			it('should save a captured image', function () {
				autorobo.screen.save("test.png", autorobo.screen.shoot());
			});
		});

		describe("#stitchVertical", function () {
			it('should stitch two images together', function () {
				var shot = autorobo.screen.shoot();
				var img = autorobo.screen.stitchVertical(shot, shot);
				
				img.getWidthSync().should.eql(autorobo.screen.size().width);
				img.getHeightSync().should.eql(autorobo.screen.size().height * 2)
			});
		});
		
		describe("#stitchHorizontal", function () {
			it('should stitch two images together', function () {
				var shot = autorobo.screen.shoot();
				var img = autorobo.screen.stitchHorizontal(shot, shot);
				
				img.getWidthSync().should.eql(autorobo.screen.size().width * 2);
				img.getHeightSync().should.eql(autorobo.screen.size().height);
			});
		});

	});

	describe('mouse', function () {
		describe('#move()', function () {
			it('should move the mouse (controlling)', function () {
				autorobo.mouse.move(0, 0);
				autorobo.mouse.move(32, 64);
			});
		});

		describe('#position()', function () {
			it('should get mouse position (controlling)', function () {
				autorobo.mouse.move(32, 64);
				
				var pos = autorobo.mouse.position();
				pos.x.should.eql(32);
				pos.y.should.eql(64);
			});
		});
	});

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
