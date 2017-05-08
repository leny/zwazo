/* hepl-mmi/zwazo
 *
 * /flappy.js - Flappy bird main class
 *
 * coded by leny@flatLand!
 * started at 08/05/2017
 */

const SPRITESHEET_PATH = "../resources/sprite.png";

class Flappy {
    constructor( { canvas, context, width, height } ) {
        // init canvas-related properties
        this.canvas = canvas;
        this.context = context;
        this.width = width;
        this.height = height;
        this.animationRequestId = null;

        // init game-related properties
        this.started = false;
        this.ended = false;
        this.score = 0;

        // load spritesheet
        this.sprites = new Image();
        this.sprites.addEventListener( "load", () => {
            this.setup();
        } );
        this.sprites.src = SPRITESHEET_PATH;
    }

    setup() {
        let { width, height } = this;

        this.background = new FLBackground( width, height );
        this.starting = new FLStarting( width, height );
        this.ground = new FLGround( width, height );
        this.bird = new FLBird( width, height );
        this.gameOver = new FLGameOver( width, height );

        this.canvas.addEventListener( "click", this.handleAction.bind( this ) );
        document.addEventListener( "keyup", this.handleAction.bind( this ) );

        this.animate();
    }

    animate() {
        this.animationRequestId = window.requestAnimationFrame( this.animate.bind( this ) );

        // update elements
        if ( this.started ) {
            this.ground.update();
            this.bird.update();
        }
        // draw
        this.context.clearRect( 0, 0, this.width, this.height );
        this.background.draw( this );
        this.ground.draw( this );
        if ( this.started ) {
            this.bird.draw( this );
        } else {
            this.starting.draw( this );
        }
        // check game state
        if ( this.started ) {
            this.checkState();
        }
    }

    handleAction( oEvent ) {
        if ( oEvent.type === "keyup" && oEvent.keyCode !== 32 ) {
            return;
        }

        if ( this.started ) {
            this.bird.handleAction();
        } else {
            this.started = true;
        }
    }

    checkState() {
        let { "dy": birdY, "dh": birdH } = this.bird.destinationFrame,
            { "dy": groundY } = this.ground.frame;

        // bird vs ground
        if ( birdY >= groundY - ( birdH / 2 ) ) {
            this.over();
        }

        // bird vs pipes
    }

    over() {
        this.ended = true;

        window.cancelAnimationFrame( this.animationRequestId );

        this.gameOver.draw( this );
    }

    drawSpriteFromFrames( { sx, sy, sw, sh, dx, dy, dw, dh } ) {
        this.context.drawImage( this.sprites, sx, sy, sw, sh, dx, dy, dw, dh );
    }
}
