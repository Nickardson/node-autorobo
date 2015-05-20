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

exports.screenSize = function () {
	return new Rectangle(Toolkit.getDefaultToolkitSync().getScreenSizeSync());
}

exports.rect = function (x, y, w, h) {
	return new Rectangle(x, y, w, h);
}

exports.capture = function (rect) {
	rect = rect || exports.screenSize();
	return robot.createScreenCaptureSync(rect);
};

exports.combineVertical = function (img1, img2) {
	var w = Math.max(img1.getWidthSync(), img2.getWidthSync());
	var h = img1.getHeightSync() + img2.getHeightSync();

	var img = new BufferedImage(w, h, BufferedImage.TYPE_INT_ARGB);

	var graphics = img.createGraphicsSync();
	graphics.drawImageSync(img1, null, 0, 0);
	graphics.drawImageSync(img2, null, 0, img1.getHeightSync());
	graphics.disposeSync();

	return img;
}

/**
 * Saves the given BufferedImage to the given filename.
 * @param  {[type]} filename [description]
 * @param  {[type]} bufimg   [description]
 * @return {[type]}          [description]
 */
exports.saveImage = function (filename, bufimg) {
	ImageIO.write(bufimg, "png", new File(filename));
};

/**
 * Captures the screen and saves it to the given filename.
 * @param  {[type]} filename The file location to save the capture to
 * @param  {[type]} rect     (Optional) The area of the screen to capture.
 * @return {[type]}          [description]
 */
exports.screenshot = function (filename, rect) {
	exports.saveImage(filename, exports.capture(rect));
};

exports.mouseMove = function (x, y) {
	robot.mouseMoveSync(x, y);
};

exports.getMouseInfo = function () {
	return MouseInfo.getPointerInfoSync();
};

exports.getMousePosition = function () {
	return exports.getMouseInfo().getLocationSync();
}

/**
 * Pauses the thread for the given time in milliseconds
 * @param  {[type]} time [description]
 * @return {[type]}      [description]
 */
exports.sleep = function (time) {
	robot.delaySync(Math.floor(time));
}

exports.MOUSE1 = InputEvent.BUTTON1_MASK;
exports.MOUSE2 = InputEvent.BUTTON2_MASK;
exports.MOUSE3 = InputEvent.BUTTON3_MASK;

exports.mousePress = function (buttons) {
	buttons = buttons || exports.MOUSE1;
	robot.mousePressSync(buttons);
}

exports.mouseRelease = function (buttons) {
	buttons = buttons || exports.MOUSE1;
	robot.mouseReleaseSync(buttons);
}

exports.mouseClick = function (buttons, delay) {
	exports.mousePress(buttons);

	if (delay) {
		exports.sleep(delay);
	}

	exports.mouseRelease(buttons);
}

exports.Key = KeyEvent;

/**
 * http://docs.oracle.com/javase/7/docs/api/java/awt/event/KeyEvent.html
 *
 * ie robot.keyPress(robot.Key.VK_PAGE_DOWN);
 * @param  {[type]} code [description]
 * @return {[type]}      [description]
 */
exports.keyPress = function (code) {
	robot.keyPressSync(code);
};

exports.keyRelease = function (code) {
	robot.keyReleaseSync(code);
};

exports.keyStroke = function (code, delay) {
	exports.keyPress(code);

	if (delay) {
		exports.sleep(delay);
	}

	exports.keyRelease(code);
}

/**
 * Scrolls the mouse wheel the given number of ticks.
 * @param  {[type]} amount [description]
 * @return {[type]}        [description]
 */
exports.mouseWheel = function (amount) {
	robot.mouseWheelSync(amount);
}
