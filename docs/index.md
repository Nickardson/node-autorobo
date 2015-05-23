## Members
<dl>
<dt><a href="#screen">screen</a> : <code>Object</code></dt>
<dd><p>Contains screen and screenshot-related robot actions.</p>
</dd>
<dt><a href="#mouse">mouse</a> : <code>Object</code></dt>
<dd><p>Contains mouse-related robot actions.</p>
</dd>
<dt><a href="#key">key</a> : <code>Object</code></dt>
<dd><p>Contains keyboard-related robot actions.</p>
</dd>
</dl>
## Functions
<dl>
<dt><a href="#sleep">sleep(time)</a> ⇒ <code>autorobo</code></dt>
<dd><p>Pauses the thread for the given time in milliseconds</p>
</dd>
</dl>
<a name="screen"></a>
## screen : <code>Object</code>
Contains screen and screenshot-related robot actions.

**Kind**: global variable  

* [screen](#screen) : <code>Object</code>
  * [.size()](#screen.size) ⇒ <code>autorobo.screen.rect</code>
  * [.rect(x, y, w, h)](#screen.rect) ⇒ <code>autorobo.screen.rect</code>
  * [.shoot(rect)](#screen.shoot) ⇒ <code>java.awt.image.BufferedImage</code>
  * [.stitchVertical(img1, img2)](#screen.stitchVertical) ⇒ <code>java.awt.image.BufferedImage</code>
  * [.stitchHorizontal(img1, img2)](#screen.stitchHorizontal) ⇒ <code>java.awt.image.BufferedImage</code>
  * [.save({String, bufimg)](#screen.save) ⇒ <code>autorobo</code>
  * [.capture(filename, rect)](#screen.capture) ⇒ <code>autorobo</code>
  * [.pixel(x, y)](#screen.pixel) ⇒ <code>Object</code>

<a name="screen.size"></a>
### screen.size() ⇒ <code>autorobo.screen.rect</code>
Gets the size of the main screen.

**Kind**: static method of <code>[screen](#screen)</code>  
**Returns**: <code>autorobo.screen.rect</code> - A rectangle object. Has properties 'width' and 'height.'  
<a name="screen.rect"></a>
### screen.rect(x, y, w, h) ⇒ <code>autorobo.screen.rect</code>
Creates a rectangle.

**Kind**: static method of <code>[screen](#screen)</code>  
**Returns**: <code>autorobo.screen.rect</code> - The created rectangle.  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Integer</code> | Upper-left x coordinate |
| y | <code>Integer</code> | Upper-left y coordinate |
| w | <code>Integer</code> | Width of the rectangle |
| h | <code>Integer</code> | Height of the rectangle |

<a name="screen.shoot"></a>
### screen.shoot(rect) ⇒ <code>java.awt.image.BufferedImage</code>
Captures a portion of the screen. Returns a java.awt.image.BufferedImage.

**Kind**: static method of <code>[screen](#screen)</code>  
**Returns**: <code>java.awt.image.BufferedImage</code> - The captured image.  

| Param | Type | Description |
| --- | --- | --- |
| rect | <code>autorobo.screen.rect</code> | The area of the screen to capture. |

<a name="screen.stitchVertical"></a>
### screen.stitchVertical(img1, img2) ⇒ <code>java.awt.image.BufferedImage</code>
Stitches together two BufferedImage's.

**Kind**: static method of <code>[screen](#screen)</code>  
**Returns**: <code>java.awt.image.BufferedImage</code> - A BufferedImage of the two given images vertically combinedThe image's width will be the largest width, the height will be the two image's height summed together,.  

| Param | Type | Description |
| --- | --- | --- |
| img1 | <code>java.awt.image.BufferedImage</code> | The image to place on the top. |
| img2 | <code>java.awt.image.BufferedImage</code> | The image to place on the bottom. |

<a name="screen.stitchHorizontal"></a>
### screen.stitchHorizontal(img1, img2) ⇒ <code>java.awt.image.BufferedImage</code>
Stitches together two BufferedImage's.

**Kind**: static method of <code>[screen](#screen)</code>  
**Returns**: <code>java.awt.image.BufferedImage</code> - A BufferedImage of the two given images vertically combinedThe image's width will be the two image's width summed together, the height will be the largest height.  

| Param | Type | Description |
| --- | --- | --- |
| img1 | <code>java.awt.image.BufferedImage</code> | The image to place on the left. |
| img2 | <code>java.awt.image.BufferedImage</code> | The image to place on the right. |

<a name="screen.save"></a>
### screen.save({String, bufimg) ⇒ <code>autorobo</code>
Saves the given BufferedImage to the given filename.

**Kind**: static method of <code>[screen](#screen)</code>  
**Returns**: <code>autorobo</code> - The autorobo module, for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| {String |  | filename The location to save the given image to. |
| bufimg | <code>java.awt.image.BufferedImage</code> | An BufferedImage. |

<a name="screen.capture"></a>
### screen.capture(filename, rect) ⇒ <code>autorobo</code>
Captures the screen and saves it to the given filename.

**Kind**: static method of <code>[screen](#screen)</code>  
**Returns**: <code>autorobo</code> - The autorobo module, for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>String</code> | The file location to save the capture to |
| rect | <code>autorobo.screen.rect</code> | (Optional) The area of the screen to capture. |

<a name="screen.pixel"></a>
### screen.pixel(x, y) ⇒ <code>Object</code>
Gets the color of a certain pixel at the given coordinates.

**Kind**: static method of <code>[screen](#screen)</code>  
**Returns**: <code>Object</code> - An object containing properties 'r', 'g', and 'b', the color of the pixel between 0 and 255 inclusive  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Integer</code> | X coordinate of pixel |
| y | <code>Integer</code> | Y coordinate of pixel |

<a name="mouse"></a>
## mouse : <code>Object</code>
Contains mouse-related robot actions.

**Kind**: global variable  

* [mouse](#mouse) : <code>Object</code>
  * [.left](#mouse.left) : <code>MouseFlag</code>
  * [.middle](#mouse.middle) : <code>MouseFlag</code>
  * [.right](#mouse.right) : <code>MouseFlag</code>
  * [.move(x, y)](#mouse.move) ⇒ <code>autorobo</code>
  * [.position()](#mouse.position) ⇒ <code>Object</code>
  * [.press(buttons)](#mouse.press) ⇒ <code>autorobo</code>
  * [.release(buttons)](#mouse.release) ⇒ <code>autorobo</code>
  * [.click(buttons, delay)](#mouse.click) ⇒ <code>autorobo</code>
  * [.wheel(amount)](#mouse.wheel) ⇒ <code>autorobo</code>

<a name="mouse.left"></a>
### mouse.left : <code>MouseFlag</code>
A number representing the left mouse button, ie for autorobo.mouse.press

**Kind**: static property of <code>[mouse](#mouse)</code>  
<a name="mouse.middle"></a>
### mouse.middle : <code>MouseFlag</code>
A number representing the middle mouse button, ie for autorobo.mouse.press

**Kind**: static property of <code>[mouse](#mouse)</code>  
<a name="mouse.right"></a>
### mouse.right : <code>MouseFlag</code>
A number representing the right mouse button, ie for autorobo.mouse.press

**Kind**: static property of <code>[mouse](#mouse)</code>  
<a name="mouse.move"></a>
### mouse.move(x, y) ⇒ <code>autorobo</code>
Moves the mouse to the given screen coordinates.

**Kind**: static method of <code>[mouse](#mouse)</code>  
**Returns**: <code>autorobo</code> - The autorobo module, for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Integer</code> | Mouse x coordinate from the upper-left corner |
| y | <code>Integer</code> | Mouse y coordinate from the upper-left corner |

<a name="mouse.position"></a>
### mouse.position() ⇒ <code>Object</code>
Gets the mouse's current position.

**Kind**: static method of <code>[mouse](#mouse)</code>  
**Returns**: <code>Object</code> - An object with the properties 'x' and 'y', representing the mouse's position.  
<a name="mouse.press"></a>
### mouse.press(buttons) ⇒ <code>autorobo</code>
Clicks down the given mouse button or buttons, or left mouse if not provided.Does not release the mouse button.

**Kind**: static method of <code>[mouse](#mouse)</code>  
**Returns**: <code>autorobo</code> - The autorobo module, for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| buttons | <code>MouseFlag</code> | (Optional) Flags for the buttons to hold down, ie autorobo.mouse.left. Defaults to the left mouse. Multiple buttons can be pressed by bitwise or'ing buttons together. |

<a name="mouse.release"></a>
### mouse.release(buttons) ⇒ <code>autorobo</code>
Releases the given mouse button or buttons, or left mouse if not provided.

**Kind**: static method of <code>[mouse](#mouse)</code>  
**Returns**: <code>autorobo</code> - The autorobo module, for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| buttons | <code>MouseFlag</code> | (Optional) Flags for the buttons to release, ie autorobo.mouse.left. Defaults to the left mouse. Multiple buttons can be pressed by bitwise or'ing buttons together. |

<a name="mouse.click"></a>
### mouse.click(buttons, delay) ⇒ <code>autorobo</code>
Presses and releases the given mouse button or buttons, or left mouse if not provided.

**Kind**: static method of <code>[mouse](#mouse)</code>  
**Returns**: <code>autorobo</code> - The autorobo module, for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| buttons | <code>MouseFlag</code> | (Optional) Flags for the buttons to click, ie autorobo.mouse.left. Defaults to the left mouse. |
| delay | <code>Integer</code> | (Optional) If provided, the number of milliseconds to sleep between pressing down and releasing the button(s). Multiple buttons can be pressed by bitwise or'ing buttons together. |

<a name="mouse.wheel"></a>
### mouse.wheel(amount) ⇒ <code>autorobo</code>
Scrolls the mouse wheel the given number of ticks.

**Kind**: static method of <code>[mouse](#mouse)</code>  
**Returns**: <code>autorobo</code> - The autorobo module, for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| amount | <code>Integer</code> | The number of 'ticks' to scroll. Can be positive to scroll down, negative to scroll up. |

<a name="key"></a>
## key : <code>Object</code>
Contains keyboard-related robot actions.

**Kind**: global variable  

* [key](#key) : <code>Object</code>
  * [.press(code)](#key.press) ⇒ <code>autorobo</code>
  * [.release(code)](#key.release) ⇒ <code>autorobo</code>
  * [.stroke(code, delay)](#key.stroke) ⇒ <code>autorobo</code>

<a name="key.press"></a>
### key.press(code) ⇒ <code>autorobo</code>
Presses down the given key, does not release that key.http://docs.oracle.com/javase/7/docs/api/java/awt/event/KeyEvent.htmlie robot.key.press(robot.Key.VK_PAGE_DOWN);

**Kind**: static method of <code>[key](#key)</code>  
**Returns**: <code>autorobo</code> - The autorobo module, for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>KeyCode</code> | An integer representing the key code to press. |

<a name="key.release"></a>
### key.release(code) ⇒ <code>autorobo</code>
Releases down the given keyhttp://docs.oracle.com/javase/7/docs/api/java/awt/event/KeyEvent.htmlie robot.key.release(robot.Key.VK_PAGE_DOWN);

**Kind**: static method of <code>[key](#key)</code>  
**Returns**: <code>autorobo</code> - The autorobo module, for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>KeyCode</code> | An integer representing the key code to release. |

<a name="key.stroke"></a>
### key.stroke(code, delay) ⇒ <code>autorobo</code>
Presses and releases the given key.http://docs.oracle.com/javase/7/docs/api/java/awt/event/KeyEvent.htmlie robot.key.stroke(robot.Key.VK_PAGE_DOWN, 100);

**Kind**: static method of <code>[key](#key)</code>  
**Returns**: <code>autorobo</code> - The autorobo module, for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>KeyCode</code> | An integer representing the key code to press. |
| delay | <code>Integer</code> | (Optional) If provided, the number of milliseconds to sleep between pressing and releasing the given key. |

<a name="sleep"></a>
## sleep(time) ⇒ <code>autorobo</code>
Pauses the thread for the given time in milliseconds

**Kind**: global function  
**Returns**: <code>autorobo</code> - The autorobo module, for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| time | <code>Integer</code> | The number of milliseconds to sleep for. |

