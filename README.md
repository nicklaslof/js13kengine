A small Javascript game engine to stop me from writing the same boilerplate code each game I do for JS13k.

Very OOP and inspired by Unity with Gameobjects and Behaviours to add in functionality for each gameobject.

Engine in the engine folder and a test implementation in the game folder (currently just a bunch of objects spawning, moving, rotating and disapearing).

Work in progress!    This little engine is probably just for me and the way I like to code.


Missing:

Sounds (zzFX)

Collisions maybe (Not sure I want it completly in the engine since I need to split objects in different tiles to minimize the number of loops needed which might be a better way to implement in the game that might have a tilemap...)

~~Input (keyboard, mouse and controller)~~

"Compiling" with my shell script I use in every game, to crunch the source (with tools like rollup, terser minify, roadroller black magic and etc/advzip)

~~Fixed timestep (might be overkill, deltatime is fine most of the time)~~
