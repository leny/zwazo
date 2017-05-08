/* hepl-mmi/zwazo
 *
 * /src/bird.js - Bird Class
 *
 * coded by leny@flatLand!
 * started at 08/05/2017
 */

class FLBird {
    constructor( width, height ) {
        this.width = width;
        this.height = height;

        this.frames = [
            {
                "sx": 6,
                "sy": 982,
                "sw": 34,
                "sh": 24,
            },
            {
                "sx": 62,
                "sy": 982,
                "sw": 34,
                "sh": 24,
            },
            {
                "sx": 118,
                "sy": 982,
                "sw": 34,
                "sh": 24,
            }
        ];

        this.animation = {
            "max": this.frames.length,
            "current": 0,
        };

        this.state = {
            "inDanger": false,
            "speed": 0,
            "acceleration": 0,
            "boost": 0,
        };

        this.position = {
            "top": 0,
            "left": 0,
        };

        this.destinationFrame = {
            "dx": ( width / 3 ) - 17,
            "dy": ( height / 3 ) - 12,
            "dw": 34,
            "dh": 24,
        };

        this.time = {
            "start": Date.now(),
            "current": null,
        };
    }

    draw( game ) {
        let { sx, sy, sw, sh } = this.frames[ this.animation.current ],
            { dx, dy, dw, dh } = this.destinationFrame;

        game.context.save();
        game.context.translate( dx, dy );
        game.context.rotate( this.state.speed / 10 );
        game.drawSpriteFromFrames( {
            sx, sy, sw, sh,
            "dx": dw / 2 * -1,
            "dy": dh / 2 * -1,
            dw, dh,
        } );
        game.context.restore();
    }

    update() {
        this.time.current = Date.now();

        if ( this.time.current - this.time.start > 50 ) {
            this.animation.current += 1;
            if ( this.animation.current === this.animation.max ) {
                this.animation.current = 0;
            }
            this.time.start = Date.now();
        }

        if ( !this.state.accelaration ) {
            this.state.acceleration = 0.4;
            this.state.boost = -5;
        }

        this.state.speed += this.state.acceleration;
        this.destinationFrame.dy += this.state.speed;
    }

    handleAction() {
        this.state.speed = this.state.boost;
    }
}
