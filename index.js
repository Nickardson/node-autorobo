var java = require('java');

var Rectangle = java.import('java.awt.Rectangle'),
	Toolkit = java.import('java.awt.Toolkit'),
	ImageIO = java.import('javax.imageio.ImageIO'),
	File = java.import('java.io.File'),
	Robot = java.import('java.awt.Robot'),
	BufferedImage = java.import('java.awt.image.BufferedImage'),
	InputEvent = java.import('java.awt.event.InputEvent'),
	KeyEvent = java.import('java.awt.event.KeyEvent'),
	MouseInfo = java.import('java.awt.MouseInfo');

var robot = new Robot();

exports.screen = {};

exports.screen.size = function () {
	return new Rectangle(Toolkit.getDefaultToolkitSync().getScreenSizeSync());
}

exports.screen.rect = function (x, y, w, h) {
	return new Rectangle(x, y, w, h);
}

exports.screen.shoot = function (rect) {
	rect = rect || exports.screen.size();
	return robot.createScreenCaptureSync(rect);
};

exports.screen.stitchVertical = function (img1, img2) {
	var w = Math.max(img1.getWidthSync(), img2.getWidthSync());
	var h = img1.getHeightSync() + img2.getHeightSync();

	var img = new BufferedImage(w, h, BufferedImage.TYPE_INT_ARGB);

	var graphics = img.createGraphicsSync();
	graphics.drawImageSync(img1, null, 0, 0);
	graphics.drawImageSync(img2, null, 0, img1.getHeightSync());
	graphics.disposeSync();

	return img;
};

exports.screen.stitchHorizontal = function (img1, img2) {
	var w = img1.getWidthSync() + img2.getWidthSync();
	var h = Math.max(img1.getHeightSync(), img2.getHeightSync());

	var img = new BufferedImage(w, h, BufferedImage.TYPE_INT_ARGB);

	var graphics = img.createGraphicsSync();
	graphics.drawImageSync(img1, null, 0, 0);
	graphics.drawImageSync(img2, null, img1.getWidthSync(), 0);
	graphics.disposeSync();

	return img;
};

/**
 * Saves the given BufferedImage to the given filename.
 * @param  {[type]} filename [description]
 * @param  {[type]} bufimg   [description]
 * @return {[type]}          [description]
 */
exports.screen.save = function (filename, bufimg) {
	ImageIO.write(bufimg, "png", new File(filename));
};

/**
 * Captures the screen and saves it to the given filename.
 * @param  {[type]} filename The file location to save the capture to
 * @param  {[type]} rect     (Optional) The area of the screen to capture.
 * @return {[type]}          [description]
 */
exports.screen.capture = function (filename, rect) {
	exports.screen.save(filename, exports.screen.shoot(rect));
};

exports.mouse = {};

exports.mouse.move = function (x, y) {
	robot.mouseMoveSync(x, y);
};

exports.mouse.position = function () {
	return MouseInfo.getPointerInfoSync().getLocationSync();
}

/**
 * Pauses the thread for the given time in milliseconds
 * @param  {[type]} time [description]
 * @return {[type]}      [description]
 */
exports.sleep = function (time) {
	robot.delaySync(Math.floor(time));
}

exports.mouse.left   = InputEvent.BUTTON1_MASK;
exports.mouse.middle = InputEvent.BUTTON2_MASK;
exports.mouse.right  = InputEvent.BUTTON3_MASK;

exports.mouse.press = function (buttons) {
	buttons = buttons || exports.mouse.left;
	robot.mousePressSync(buttons);
}

exports.mouse.release = function (buttons) {
	buttons = buttons || exports.mouse.left;
	robot.mouseReleaseSync(buttons);
}

exports.mouse.click = function (buttons, delay) {
	exports.mouse.press(buttons);

	if (delay) {
		exports.sleep(delay);
	}

	exports.mouse.release(buttons);
}

/**
 * Scrolls the mouse wheel the given number of ticks.
 * @param  {[type]} amount [description]
 * @return {[type]}        [description]
 */
exports.mouse.wheel = function (amount) {
	robot.mouseWheelSync(amount);
}

exports.key = {};

for (var prop in KeyEvent) {
	if (prop.indexOf("VK_") == 0) {
		exports.key[prop] = KeyEvent[prop];
	}
}

/**
 * http://docs.oracle.com/javase/7/docs/api/java/awt/event/KeyEvent.html
 *
 * ie robot.keyPress(robot.Key.VK_PAGE_DOWN);
 * @param  {[type]} code [description]
 * @return {[type]}      [description]
 */
exports.key.press = function (code) {
	if (code) {
		robot.keyPressSync(code);
	} else {
		throw Error("Keycode must be provided, see http://docs.oracle.com/javase/7/docs/api/java/awt/event/KeyEvent.html#field_summary");
	}
};

exports.key.release = function (code) {
	if (code) {
		robot.keyReleaseSync(code);
	} else {
		throw Error("Keycode must be provided, see http://docs.oracle.com/javase/7/docs/api/java/awt/event/KeyEvent.html#field_summary");
	}
};

exports.key.stroke = function (code, delay) {
	if (code) {
		exports.key.press(code);

		if (delay) {
			exports.sleep(delay);
		}

		exports.key.release(code);
	} else {
		throw Error("Keycode must be provided, see http://docs.oracle.com/javase/7/docs/api/java/awt/event/KeyEvent.html#field_summary");
	}
}
