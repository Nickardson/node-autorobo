# autorobo

A node module which simulates mouse and keyboard input, and take screenshots.

## Installation
```
$ npm install node-autorobo
```

See requirements for: https://github.com/joeferner/node-java

## Example
```javascript
var robo = require("autorobo");

// move the mouse to coordinates
robo.mouseMove(100, 400);

// click left mouse
robo.mouseClick(robo.MOUSE1);

// perform a keystroke (http://docs.oracle.com/javase/7/docs/api/java/awt/event/KeyEvent.html#field_summary)
robo.keyStroke(robo.Key.V_Z);
robo.keyStroke(robo.Key.V_PAGE_DOWN);

// take a screenshot and save it
robo.screenshot("photo.png");
```

### mouseMove
