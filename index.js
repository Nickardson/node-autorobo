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

exports.robot = robot;

/**
 * Contains screen and screenshot-related robot actions.
 * @type {Object}
 */
exports.screen = {};

/**
 * Gets the size of the main screen.
 * @return {autorobo.screen.rect} A rectangle object. Has properties 'width' and 'height.'
 */
exports.screen.size = function () {
	return new Rectangle(Toolkit.getDefaultToolkitSync().getScreenSizeSync());
}

/**
 * Creates a rectangle.
 * @param  {Integer} x Upper-left x coordinate
 * @param  {Integer} y Upper-left y coordinate
 * @param  {Integer} w Width of the rectangle
 * @param  {Integer} h Height of the rectangle
 * @return {autorobo.screen.rect}   The created rectangle.
 */
exports.screen.rect = function (x, y, w, h) {
	return new Rectangle(x, y, w, h);
}

/**
 * Captures a portion of the screen. Returns a java.awt.image.BufferedImage.
 * @param  {autorobo.screen.rect} rect The area of the screen to capture.
 * @return {java.awt.image.BufferedImage}      The captured image.
 */
exports.screen.shoot = function (rect) {
	rect = rect || exports.screen.size();
	return robot.createScreenCaptureSync(rect);
};

/**
 * Stitches together two BufferedImage's.
 * @param  {java.awt.image.BufferedImage} img1 The image to place on the top.
 * @param  {java.awt.image.BufferedImage} img2 The image to place on the bottom.
 * @return {java.awt.image.BufferedImage}      A BufferedImage of the two given images vertically combined
 * The image's width will be the largest width, the height will be the two image's height summed together,.
 */
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

/**
 * Stitches together two BufferedImage's.
 * @param  {java.awt.image.BufferedImage} img1 The image to place on the left.
 * @param  {java.awt.image.BufferedImage} img2 The image to place on the right.
 * @return {java.awt.image.BufferedImage}      A BufferedImage of the two given images vertically combined
 * The image's width will be the two image's width summed together, the height will be the largest height.
 */
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
 * @param  {String} filename The location to save the given image to.
 * @param  {java.awt.image.BufferedImage} bufimg   An BufferedImage.
 * @return {autorobo}          The autorobo module, for chaining.
 */
exports.screen.save = function (filename, bufimg) {
	ImageIO.write(bufimg, "png", new File(filename));

	return exports;
};

/**
 * Captures the screen and saves it to the given filename.
 * @param  {String} filename The file location to save the capture to
 * @param  {autorobo.screen.rect} rect     (Optional) The area of the screen to capture.
 * @return {autorobo}          The autorobo module, for chaining.
 */
exports.screen.capture = function (filename, rect) {
	exports.screen.save(filename, exports.screen.shoot(rect));
	
	return exports;
};

/**
 * Gets the color of a certain pixel at the given coordinates.
 * @param  {Integer} x X coordinate of pixel
 * @param  {Integer} y Y coordinate of pixel
 * @return {Object}   An object containing properties 'r', 'g', and 'b', the color of the pixel between 0 and 255 inclusive
 */
exports.screen.pixel = function (x, y) {
	var c = robot.getPixelColorSync(x, y);
	
	return {
		r: c.getRedSync(),
		g: c.getGreenSync(),
		b: c.getBlueSync()
	};
}

/**
 * Contains mouse-related robot actions.
 * @type {Object}
 */
exports.mouse = {};

/**
 * Moves the mouse to the given screen coordinates.
 * @param  {Integer} x Mouse x coordinate from the upper-left corner
 * @param  {Integer} y Mouse y coordinate from the upper-left corner
 * @return {autorobo}          The autorobo module, for chaining.
 */
exports.mouse.move = function (x, y) {
	robot.mouseMoveSync(x, y);

	return exports;
};

/**
 * Gets the mouse's current position.
 * @return {Object} An object with the properties 'x' and 'y', representing the mouse's position.
 */
exports.mouse.position = function () {
	var pos = MouseInfo.getPointerInfoSync().getLocationSync();

	return {
		x: pos.x,
		y: pos.y
	};
}

/**
 * Pauses the thread for the given time in milliseconds
 * @param  {Integer} time      The number of milliseconds to sleep for.
 * @return {autorobo}          The autorobo module, for chaining.
 */
exports.sleep = function (time) {
	robot.delaySync(Math.floor(time));

	return exports;
}

/**
 * A number representing the left mouse button, ie for autorobo.mouse.press
 * @type {MouseFlag}
 */
exports.mouse.left   = InputEvent.BUTTON1_MASK;

/**
 * A number representing the middle mouse button, ie for autorobo.mouse.press
 * @type {MouseFlag}
 */
exports.mouse.middle = InputEvent.BUTTON2_MASK;

/**
 * A number representing the right mouse button, ie for autorobo.mouse.press
 * @type {MouseFlag}
 */
exports.mouse.right  = InputEvent.BUTTON3_MASK;

/**
 * Clicks down the given mouse button or buttons, or left mouse if not provided.
 * Does not release the mouse button.
 * @param  {MouseFlag} buttons (Optional) Flags for the buttons to hold down, ie autorobo.mouse.left. Defaults to the left mouse.
 * Multiple buttons can be pressed by bitwise or'ing buttons together.
 * @return {autorobo}          The autorobo module, for chaining.
 */
exports.mouse.press = function (buttons) {
	buttons = buttons || exports.mouse.left;
	robot.mousePressSync(buttons);

	return exports;
}

/**
 * Releases the given mouse button or buttons, or left mouse if not provided.
 * @param  {MouseFlag} buttons (Optional) Flags for the buttons to release, ie autorobo.mouse.left. Defaults to the left mouse.
 * Multiple buttons can be pressed by bitwise or'ing buttons together.
 * @return {autorobo}          The autorobo module, for chaining.
 */
exports.mouse.release = function (buttons) {
	buttons = buttons || exports.mouse.left;
	robot.mouseReleaseSync(buttons);
	
	return exports;
}

/**
 * Presses and releases the given mouse button or buttons, or left mouse if not provided.
 * @param  {MouseFlag} buttons (Optional) Flags for the buttons to click, ie autorobo.mouse.left. Defaults to the left mouse.
 * @param {Integer} delay (Optional) If provided, the number of milliseconds to sleep between pressing down and releasing the button(s).
 * Multiple buttons can be pressed by bitwise or'ing buttons together.
 * @return {autorobo}          The autorobo module, for chaining.
 */
exports.mouse.click = function (buttons, delay) {
	exports.mouse.press(buttons);

	if (delay) {
		exports.sleep(delay);
	}

	exports.mouse.release(buttons);

	return exports;
}

/**
 * Scrolls the mouse wheel the given number of ticks.
 * @param  {Integer} amount The number of 'ticks' to scroll. Can be positive to scroll down, negative to scroll up.
 * @return {autorobo}          The autorobo module, for chaining.
 */
exports.mouse.wheel = function (amount) {
	robot.mouseWheelSync(amount);

	return exports;
}

/**
 * Contains keyboard-related robot actions.
 * @type {Object}
 */
exports.key = {};

// load all virtual keys into autorobo.key
for (var prop in KeyEvent) {
	if (prop.indexOf("VK_") == 0) {
		exports.key[prop] = KeyEvent[prop];
	}
}

/**
 * Presses down the given key, does not release that key.
 * 
 * http://docs.oracle.com/javase/7/docs/api/java/awt/event/KeyEvent.html
 *
 * ie robot.key.press(robot.Key.VK_PAGE_DOWN);
 * @param  {KeyCode} code An integer representing the key code to press.
 * @return {autorobo}          The autorobo module, for chaining.
 */
exports.key.press = function (code) {
	if (code) {
		robot.keyPressSync(code);
	} else {
		throw Error("Keycode must be provided, see http://docs.oracle.com/javase/7/docs/api/java/awt/event/KeyEvent.html#field_summary");
	}

	return exports;
};

/**
 * Releases down the given key
 * 
 * http://docs.oracle.com/javase/7/docs/api/java/awt/event/KeyEvent.html
 *
 * ie robot.key.release(robot.Key.VK_PAGE_DOWN);
 * @param  {KeyCode} code An integer representing the key code to release.
 * @return {autorobo}          The autorobo module, for chaining.
 */
exports.key.release = function (code) {
	if (code) {
		robot.keyReleaseSync(code);
	} else {
		throw Error("Keycode must be provided, see http://docs.oracle.com/javase/7/docs/api/java/awt/event/KeyEvent.html#field_summary");
	}
	
	return exports;
};

/**
 * Presses and releases the given key.
 * 
 * http://docs.oracle.com/javase/7/docs/api/java/awt/event/KeyEvent.html
 *
 * ie robot.key.stroke(robot.Key.VK_PAGE_DOWN, 100);
 * @param  {KeyCode} code  An integer representing the key code to press.
 * @param  {Integer} delay (Optional) If provided, the number of milliseconds to sleep between pressing and releasing the given key.
 * @return {autorobo}          The autorobo module, for chaining.
 */
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

	return exports;
}
