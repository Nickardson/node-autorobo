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
			it('should get mouse position (controlling)', function () {
				autorobo.mouse.move(32, 64);
				
				var pos = autorobo.mouse.position();
				pos.x.should.eql(32);
				pos.y.should.eql(64);
			});
		});
	});
});
