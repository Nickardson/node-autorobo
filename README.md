# autorobo

A node module which simulates mouse and keyboard input, and take screenshots.

## Installation
```
$ npm install autorobo
```

See requirements for: https://github.com/joeferner/node-java

## Example
```javascript
var robo = require("autorobo");


// move the mouse to coordinates
robo.mouse.move(100, 400);

// click left mouse
robo.mouse.click(robo.mouse.left);

// click and hold right mouse for 1 second
robo.mouse.click(robo.mouse.right, 1000);

// press middle mouse, move, and release.
robo.mouse.press(robo.mouse.middle);
robo.mouse.move(150, 400);
robo.mouse.release(robo.mouse.middile);

// perform a keystroke
// (http://docs.oracle.com/javase/7/docs/api/java/awt/event/KeyEvent.html#field_summary)
robo.key.stroke(robo.key.VK_PAGE_DOWN);

// hold a key for 1 second
robo.key.press(robo.key.VK_W);
robo.sleep(1000);
robo.key.release(robo.key.VK_W);

// get the screen size
var size = robo.screen.size();
console.log(size.width, size.height);

// save a screenshot to file
robo.screen.capture("photo.png");

// save a region of the screen starting at (20, 20), with a size of (50, 50)
robo.screen.capture("photo.png", robo.screen.rect(20, 20, 50, 50));
```
