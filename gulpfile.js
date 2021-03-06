/* leny/zwazo
 *
 * /gulpfile.js - Gulp tasks
 *
 * coded by leny@flatLand!
 * started at 08/05/2017
 */

var gulp = require( "gulp" ),
    babel = require( "gulp-babel" ),
    rename = require( "gulp-rename" ),
    sourcemaps = require( "gulp-sourcemaps" ),
    fCompileExo;

// --- Task for js

gulp.task( "js", function() {
    gulp.src( "src/**/*.js" )
        .pipe( sourcemaps.init() )
        .pipe( babel() )
        .on( "error", function( oError ) {
            console.error( oError );
            this.emit( "end" );
        } )
        .pipe( sourcemaps.write() )
        .pipe( rename( function( path ) {
            path.basename += ".min";
        } ) )
        .pipe( gulp.dest( "bin" ) );
} );

// --- Watch tasks

gulp.task( "watch", function() {
    aFolders.forEach( function( sFolder ) {
        gulp.watch( "src/**/*.js", "js" );
    } );
} );

// --- Aliases

gulp.task( "default", [ "js" ] );
gulp.task( "work", [ "default", "watch" ] );
