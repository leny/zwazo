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

        this.background = new FLBackground( width, height );
        this.starting = new FLStarting( width, height );
        this.ground = new FLGround( width, height );
        this.bird = new FLBird( width, height );
        this.gameOver = new FLGameOver( width, height );
        this.tubes = [
            new FLTubesPair( width, height, 500 ),
            new FLTubesPair( width, height, 680 ),
        ];

        // init game-related properties
        this.started = false;
        this.ended = false;
        this.score = 0;
        this.insideTubeIndex = null;
    }

    animate() {
        this.animationRequestId = window.requestAnimationFrame( this.animate.bind( this ) );

        // check game state
        if ( this.started ) {
            this.checkState();
        }
        // update elements
        if ( this.started ) {
            this.ground.update();
            this.bird.update();
            this.tubes.forEach( ( oTube ) => oTube.update() );
        }
        // draw
        this.context.clearRect( 0, 0, this.width, this.height );
        this.background.draw( this );
        this.tubes.forEach( ( oTube ) => oTube.draw( this ) );
        this.ground.draw( this );
        if ( this.started ) {
            this.bird.draw( this );
            if ( this.ended ) {
                this.gameOver.draw( this );
            }
        } else {
            this.starting.draw( this );
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
            if ( window.confirm( "Voulez-vous rejouer ?" ) ) {
                this.reset();
                this.animate();
            }
        }
    }

    checkState() {
        let { "dx": birdX, "dy": birdY, "dw": birdW, "dh": birdH } = this.bird.destinationFrame,
            { "dy": groundY } = this.ground.frame;

        // bird vs ground
        if ( birdY >= groundY - ( birdH / 2 ) ) {
            this.over();
        }

        // bird vs pipes
        this.tubes.forEach( ( oTube, iIndex ) => {
            let { "dx": tbX, "dy": tbY, "dw": tbW, "dh": tbH } = oTube.frames.top,
                { "dy": tbBottomY } = oTube.frames.bottom;

            // step one : check if bird is inside tube horizontal zone
            if ( birdX > tbX && ( birdX + birdW ) < ( tbX + tbW ) ) {
                // step two : check if bird is inside tube "danger zone"
                // bug bounty : this is kinda lacky and have a flaw. submit a PR to gain extra credits! (haha, fat chance)
                if ( ( tbY + tbH ) < birdY && ( birdY + birdH ) < tbBottomY ) {
                    this.insideTubeIndex = iIndex;
                } else {
                    this.over();
                }
            } else {
                if ( this.insideTubeIndex === iIndex ) {
                    this.insideTubeIndex = null;
                    this.score++;
                }
            }
        } );
    }

    over() {
        this.ended = true;

        window.cancelAnimationFrame( this.animationRequestId );

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
