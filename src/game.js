/* hepl-mmi/zwazo
 *
 * /game.js - Canvas initialisation, game launcher
 *
 * coded by leny@flatLand!
 * started at 08/05/2017
 */

let oApp = {
    "canvas": null,
    "context": null,
    "width": null,
    "height": null,
};

const setup = function() {
    oApp.canvas = document.querySelector( "#game" );
    if ( !oApp.canvas.getContext ) {
        console.error( "Your browser doesn't support canvas!" );
        return;
    }
    oApp.context = oApp.canvas.getContext( "2d" );
    oApp.width = oApp.canvas.width;
    oApp.height = oApp.canvas.height;

    new Flappy( oApp );
};

setup();
