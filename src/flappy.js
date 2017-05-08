/* hepl-mmi/zwazo
 *
 * /flappy.js - Flappy bird main class
 *
 * coded by leny@flatLand!
 * started at 08/05/2017
 */

const SPRITESHEET_PATH = "../resources/sprite.png";

class Flappy {
    constructor( { context, width, height } ) {
        // init canvas-related properties
        this.context = context;
        this.width = width;
        this.height = height;

        // init game-related properties

        // load spritesheet
        this.sprites = new Image();
        this.sprites.addEventListener( "load", () => {
            this.setup();
        } );
        this.sprites.src = SPRITESHEET_PATH;
    }

    setup() {
        this.background = new FLBackground( this.width, this.height );
        this.starting = new FLStarting( this.width, this.height );
        this.ground = new FLGround( this.width, this.height );

        this.animate();
    }

    animate() {
        this.background.draw( this );
        this.starting.draw( this );
        this.ground.draw( this );

        window.requestAnimationFrame( this.animate.bind( this ) );
    }

    drawSpriteFromFrames( { sx, sy, sw, sh, dx, dy, dw, dh } ) {
        this.context.drawImage( this.sprites, sx, sy, sw, sh, dx, dy, dw, dh );
    }
}
