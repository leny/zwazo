/* hepl-mmi/zwazo
 *
 * /src/tubes-pair.js - Tubes Pair class
 *
 * coded by leny@flatLand!
 * started at 15/05/2017
 */

const TUBES_GAP = 430;

class FLTubesPair {
    constructor( width, height, iStartingPosition ) {
        this.width = width;
        this.height = height;

        let iPairHeight = FLTubesPair.generateNextPairHeight();

        this.frames = {
            "top": {
                "sx": 112,
                "sy": 646,
                "sw": 52,
                "sh": 320,
                "dx": iStartingPosition,
                "dy": iPairHeight,
                "dw": 52,
                "dh": 320,
            },
            "bottom": {
                "sx": 168,
                "sy": 646,
                "sw": 52,
                "sh": 320,
                "dx": iStartingPosition,
                "dy": iPairHeight + TUBES_GAP,
                "dw": 52,
                "dh": 320,
            },
        };
        this.speed = 3;
    }

    draw( game ) {
        game.drawSpriteFromFrames( this.frames.top );
        game.drawSpriteFromFrames( this.frames.bottom );
    }

    update() {
        this.frames.top.dx -= this.speed;
        this.frames.bottom.dx -= this.speed;

        if ( this.frames.top.dx < -1 * this.frames.top.dw ) {
            let iNewPairHeight = FLTubesPair.generateNextPairHeight();

            this.frames.top.dx = this.width;
            this.frames.top.dy = iNewPairHeight;
            this.frames.bottom.dx = this.width;
            this.frames.bottom.dy = iNewPairHeight + TUBES_GAP;
        }
    }
}

FLTubesPair.lastPairHeight = -1 * ( 50 + Math.floor( Math.random() * 250 ) );

FLTubesPair.generateNextPairHeight = function() {
    let iMultiplier = Math.round( Math.random() ) % 2 ? -1 : 1,
        iMaxGap = 100,
        iNewValue = FLTubesPair.lastPairHeight + ( Math.random() * iMaxGap * iMultiplier );

    ( iNewValue > -50 ) && ( iNewValue = -50 );
    ( iNewValue < -300 ) && ( iNewValue = -300 );

    FLTubesPair.lastPairHeight = iNewValue;

    return iNewValue;
};
