#!/usr/bin/env node

// get in from bash with "node ." or "npm run emailChecker" as specified in package.json
const emailValidator = require( 'email-validator' );
const axios = require( 'axios' );
const chalk = require( 'chalk' );
const figlet = require( 'figlet' );
const ora = require( 'ora' );
const gradient = require( 'gradient-string' );

let spinner = ora( {
    text: 'Checking for breaches...\n',
    spinner: {
        interval: 80,
		frames: [
			"🌑 ",
			"🌒 ",
			"🌓 ",
			"🌔 ",
			"🌕 ",
			"🌖 ",
			"🌗 ",
			"🌘 "
        ]
    }
} );
let userEntry = process.argv[ 2 ];

function displayHeader () {
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
            console.log( gradient( 'rgb(45, 185, 210)', 'rgb(25, 85, 255)' )( string ) );
        }
    );

    return new Promise( success => {
        setTimeout( () => {
            success( 'displayed' );
        }, 100 );
    } );
}

async function validateEmail ( email ) {
    const header = await displayHeader();

    if ( emailValidator.validate( email ) ) {
        // Email is valid
        checkBreaches( email );
    } else {
        // Email is not valid
        console.log( chalk.red( chalk.bold.cyan( email ) + " is not valid. Please retry with a valid email adress." ) );
    }
}

function checkBreaches( email ) {
    // Start spinner while requesting API
    spinner.start();

    axios( {
        method: 'get',
        baseURL: 'https://haveibeenpwned.com/api/v2/breachedaccount/' + email,
        headers: {
            'User-Agent': 'emailChecker'
        },
        responseType: 'json'
    } )
        .then( function ( response ) {
            // Stop spinner
            spinner.succeed( 'Check completed !' );
            spinner.stop();

            // Display results
            console.log( chalk.white( chalk.bold.cyan( email ) + ' has ' + chalk.bold.red( response.data.length + ' breaches' ) + ' (out of 340) on the following domains :\n' ) );
            response.data.forEach( element => {
                console.log( chalk.yellow( ' • ' + element.Name + chalk.red( ' (' + element.Domain + ')' ) ) );
            } );
        } )
        .catch( function ( error ) {
            // API returns 404 error when no breach is found
            if ( error.response.status === 404 ) {
                // If error is 404
                // Stop spinner
                spinner.succeed( 'Check completed !' );
                spinner.stop();

                console.log( chalk.green( chalk.bold.cyan( email ) + ' doesn\'t have any breach. Congratulations !' ) );
            } else {
                // If error is something else than 404
                // Stop spinner
                spinner.fail( 'Check failed !' );
                spinner.stop();

                console.log( chalk.red( 'Breaches check on ' + chalk.bold.cyan( email ) + ' failed with error code ' + error.response.status ) );
            }
        } );
}

// Start email validation
validateEmail( userEntry );
