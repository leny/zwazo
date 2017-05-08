/* hepl-mmi/zwazo
 *
 * /src/starting.js - Starting Screen
 *
 * coded by leny@flatLand!
 * started at 08/05/2017
 */

class FLStarting {
    constructor( width, height ) {
        this.frames = {
            "logo": {
                "sx": 701,
                "sy": 182,
                "sw": 179,
                "sh": 49,
                "dx": ( width - 179 ) / 2,
                "dy": 60,
                "dw": 179,
                "dh": 49,
            },
            "ready": {
                "sx": 584,
                "sy": 116,
                "sw": 196,
                "sh": 62,
                "dx": ( width - 196 ) / 2,
                "dy": 165,
                "dw": 196,
                "dh": 62,
            },
            "button": {
                "sx": 702,
                "sy": 234,
                "sw": 116,
                "sh": 70,
                "dx": ( width - 116 ) / 2,
                "dy": 250,
                "dw": 116,
                "dh": 70,
            },
        };
    }

    draw( game ) {
        game.drawSpriteFromFrames( this.frames.logo );
        game.drawSpriteFromFrames( this.frames.ready );
        game.drawSpriteFromFrames( this.frames.button );
    }
}
