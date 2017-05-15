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
        this.insideTubeIndex = null;

        // load spritesheet
        this.sprites = new Image();
        this.sprites.addEventListener( "load", () => {
            this.setup();
        } );
        this.sprites.src = SPRITESHEET_PATH;
    }

    setup() {
        this.reset();

        this.canvas.addEventListener( "click", this.handleAction.bind( this ) );
        document.addEventListener( "keyup", this.handleAction.bind( this ) );

        this.animate();
    }

    reset() {
        let { width, height } = this;

        this.score = 0;
        this.insideTubeIndex = null;
        this.background = new FLBackground( width, height );
        this.starting = new FLStarting( width, height );
        this.ground = new FLGround( width, height );
        this.bird = new FLBird( width, height );
        this.gameOver = new FLGameOver( width, height );
        this.tubes = [
            new FLTubesPair( width, height, 500 ),
            new FLTubesPair( width, height, 680 ),
        ];

        this.started = false;
        this.ended = false;
    }

    animate() {
        this.animationRequestId = window.requestAnimationFrame( this.animate.bind( this ) );

        // update elements
        if ( this.started ) {
            this.ground.update();
            this.tubes.forEach( ( oTube ) => oTube.update() );
            this.bird.update();
        }
        // draw
        this.context.clearRect( 0, 0, this.width, this.height );
        this.background.draw( this );
        this.tubes.forEach( ( oTube ) => oTube.draw( this ) );
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

        if ( this.ended ) {
            if ( window.confirm( "Relancer le jeu ?" ) ) {
                this.reset();
                this.animate();
            }
        }
    }

    checkState() {
        let { "dx": birdX, "dy": birdY, "dh": birdH, "dw": birdW } = this.bird.destinationFrame,
            { "dy": groundY } = this.ground.frame;

        // bird vs ground
        if ( birdY >= groundY - ( birdH / 2 ) ) {
            this.over();
        }

        // bird vs tubes
        this.tubes.forEach( ( oTube, iTubeIndex ) => {
            let { "dx": tbX, "dy": tbY, "dw": tbW, "dh": tbH } = oTube.frames.top,
                { "dy": tbBottomY } = oTube.frames.bottom;

            // step one : check if bird is inside tube horizontal zone
            if ( birdX > tbX && ( birdX + birdW ) < ( tbX + tbW ) ) {
                // step two : check if bird is inside tube "danger zone"
                if ( ( tbY + tbH ) < birdY && ( birdY + birdH ) < tbBottomY ) {
                    this.insideTubeIndex = iTubeIndex;
                } else {
                    this.over();
                }
            } else {
                if ( this.insideTubeIndex === iTubeIndex ) {
                    this.insideTubeIndex = null;
                    this.score++;
                }
            }
        } );
    }

    over() {
        this.ended = true;

        window.cancelAnimationFrame( this.animationRequestId );

        this.gameOver.draw( this );

        // TODO: call axios.get & axios.post
        /*
        axios.post( "http://my.api.lan/add", { "score": this.score } )
            .then( ( oResponse ) => {
                console.log( oResponse );
                // TODO: call axios.get
            } )
            .catch( ( oError ) => {
                console.error( oError );
                // TODO: do something with the error
            } );
        */
    }

    drawSpriteFromFrames( { sx, sy, sw, sh, dx, dy, dw, dh } ) {
        this.context.drawImage( this.sprites, sx, sy, sw, sh, dx, dy, dw, dh );
    }
}
