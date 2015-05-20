var should = require('should');

var autorobo = require('./index.js');

describe('autorobo', function () {
	describe('#screenSize()', function () {
		it('should measure screen size without error', function () {
			var size = autorobo.screenSize();
			
			size.should.have.property('width');
			size.width.should.be.above(0);
			
			size.should.have.property('height');
			size.height.should.be.above(0);
		});
	});

	describe('#rect()', function () {
		it('should create a rectangle', function () {
			autorobo.rect(0, 0, 0, 0);
		});
		
		it('should create a rectangle with the proper dimensions', function () {
			var r = autorobo.rect(10, 20, 30, 40);

			r.x.should.eql(10);
			r.y.should.eql(20);
			r.width.should.eql(30);
			r.height.should.eql(40);
		});
	});

	describe('#capture()', function () {
		it('should capture the whole screen', function () {
			var size = autorobo.screenSize();
			var capture = autorobo.capture();
			
			capture.getWidthSync().should.eql(size.width);
			capture.getHeightSync().should.eql(size.height);
		});

		it('should capture the whole screen when told a specific size', function () {
			var size = autorobo.screenSize();
			var capture = autorobo.capture(size);
			
			capture.getWidthSync().should.eql(size.width);
			capture.getHeightSync().should.eql(size.height);
		});
		
		it('should capture a portion of the screen', function () {
			var size = autorobo.rect(40, 40, 300, 300)
			var capture = autorobo.capture(size);
			
			capture.getWidthSync().should.eql(size.width);
			capture.getHeightSync().should.eql(size.height);
		});

	});

});
