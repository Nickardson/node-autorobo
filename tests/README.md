# Running all the tests

Being primarily a mouse/keyboard library, some tests involve moving the mouse and inputting keys.
So as not to wreck your computer, tests that control the mouse and keyboard are by default excluded by "--invert --fgrep controlling" in the package.json.
Remove the "--invert" to run the tests which will move the mouse and input keys.
