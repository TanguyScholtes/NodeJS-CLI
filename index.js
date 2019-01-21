#!/usr/bin/env node
//console.log( "Hello, Node.JS!" ); // display in bash with "node ." or "npm run emailChecker" as specified in package.json

const emailValidator = require( 'email-validator' );
const axios = require( 'axios' );
const chalk = require( 'chalk' );
let userEntry = process.argv[ 2 ];

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
            console.log( chalk.white( chalk.bold.blue( userEntry ) + ' has ' + chalk.bold.red( response.data.length + ' breaches' ) + ' (out of 340) on the following domains :\n' ) );
            response.data.forEach( element => console.log( chalk.red( element.Name ) ) );
        } )
        .catch( function ( error ) {
            if ( error.response.status === 404 ) {
                console.log( chalk.green( userEntry + ' doesn\'t have any breach. Congratulations !' ) );
            } else {
                console.log( chalk.red( 'Breaches check on ' + userEntry + ' failed with error code ' + error.response.status ) );
            }
        } );
} else {
    console.log( chalk.red( userEntry + " is not valid. Please retry with a valid email adress." ) );
}
