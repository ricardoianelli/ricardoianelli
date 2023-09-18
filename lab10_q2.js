/*
Question 2

1. Explain why do we want sometimes to use setImmediate instead of using setTimeout?

A: You use setImmediate if you want the code to run before any timers or scheduled functions.
The exception case is if you're running it from the main module and not from inside an I/O cycle, then you cannot
guarantee the order and a setImmediate callback can be executed after a setTimeout with a 0 delay, since it will be
non-deterministic.

2. Explain the difference between process.nextTick and setImmediate?

A: process.nextTick will be executed BEFORE the next execution of the event loop, while setImmediate will 
be executed only in the next event loop cycle.

3. Does Node.js has window object?

A: No, Node.js have local scope, and modules. 
You do have a global object, which acts similar as the window object in front-end Javascript, and can
be accessible from all the modules.

*/

