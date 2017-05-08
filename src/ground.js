/* hepl-mmi/zwazo
 *
 * /src/ground.js - Ground class
 *
 * coded by leny@flatLand!
 * started at 08/05/2017
 */

class FLGround {
    constructor( width, height ) {
        this.frame = {
            "sx": 584,
            "sy": 0,
            "sw": 336,
            "sh": 112,
            "dx": 0,
            "dy": height - 112,
            "dw": 336,
            "dh": 112
        };
        this.speed = 3;
        this.maxOffset = 336 - width;
    }

    draw( game ) {
        game.drawSpriteFromFrames( this.frame );
    }

    update() {

    }
}
