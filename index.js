//console.log( "Hello, Node.JS!" ); // display in bash with "node ." or "npm run emailChecker" as specified in package.json

const emailValidator = require( 'email-validator' );
const axios = require( 'axios' );
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
            console.log( userEntry + ' has breaches in the following domains (out of 340) :\n' );
            console.log( response.data );
        } )
        .catch( error => console.log( userEntry + ' doesn\'t have any breach (out of 340). Congratulations !' ) );
} else {
    console.log( userEntry + " is not valid. Please retry with a valid email adress." );
}
