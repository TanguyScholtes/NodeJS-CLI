#!/usr/bin/env node

// get in from bash with "node ." or "npm run emailChecker" as specified in package.json
const emailValidator = require( 'email-validator' );
const axios = require( 'axios' );
const chalk = require( 'chalk' );
const figlet = require( 'figlet' );

let userEntry = process.argv[ 2 ];

/*
// display figlet's fonts list
figlet.fonts(function(err, fonts) {
    if (err) {
        console.log('something went wrong...');
        console.dir(err);
        return;
    }
    console.dir(fonts);
});
return;
*/

figlet( "BeCode\nEmail Checker",
    {
        kerning: 'fitted',
        font: 'Doom'
    },
    function( error, string ) {
        if ( error ) {
            console.log( 'Whoops!' );
            console.dir( error );
            return;
        }
        console.log( string );
    }
);

if ( emailValidator.validate( userEntry ) ) {
    // contact pwned with verified email address
    // display result
    axios( {
        method: 'get',
        baseURL: 'https://haveibeenpwned.com/api/v2/breachedaccount/' + userEntry + '?truncateResponse=true',
        headers: {
            'User-Agent': 'emailChecker'
        },
        responseType: 'json'
    } )
        .then( function ( response ) {
            console.log( chalk.white( chalk.bold.cyan( userEntry ) + ' has ' + chalk.bold.red( response.data.length + ' breaches' ) + ' (out of 340) on the following domains :\n' ) );
            response.data.forEach( element => console.log( chalk.red( element.Name ) ) );
        } )
        .catch( function ( error ) {
            if ( error.response.status === 404 ) {
                console.log( chalk.green( chalk.bold.cyan( userEntry ) + ' doesn\'t have any breach. Congratulations !' ) );
            } else {
                console.log( chalk.red( 'Breaches check on ' + chalk.bold.cyan( userEntry ) + ' failed with error code ' + error.response.status ) );
            }
        } );
} else {
    console.log( chalk.red( chalk.bold.cyan( userEntry ) + " is not valid. Please retry with a valid email adress." ) );
}
