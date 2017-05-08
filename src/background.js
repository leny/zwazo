/* hepl-mmi/zwazo
 *
 * /src/js/background.js - Background class
 *
 * coded by leny@flatLand!
 * started at 08/05/2017
 */

class FLBackground {
    constructor( width, height ) {
        this.frame = {
            "sx": 0,
            "sy": 0,
            "sw": 288,
            "sh": 511,
            "dx": 0,
            "dy": 0,
            "dw": width,
            "dh": height,
        };
    }

    draw( game ) {
        game.drawSpriteFromFrames( this.frame );
    }
}
