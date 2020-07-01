// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out

//Require HTTPS module
const https = require('https');
//Require HTTP module
const http = require('http');

//Print message to console
function printMessage(username, badgeCount, points){
  const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
    console.log(message);
}

function printErrorMessage(error){
    console.error(error.message);
}

// Connect to the API URL (https://teamtreehouse.com/denyschornyi.json)
function getProfile(username) {
    try{
        const request = https.get(`https://teamtreehouse.com/${username}.json`, (res) => {
           if(res.statusCode === 200){
                let body = '';
                // Read the data
                res.on('data', d => {
                    body += d.toString();
                });
        
                res.on('end', d => {
                    try{
                        // Parse the data
                        // Print the data
                        const profile = JSON.parse(body);
                        printMessage(username, profile.badges.length , profile.points.total);
                    }catch(error){
                        printErrorMessage(error);
                    }
                });
           } else{
               const message = `There was an error getting profile for ${username} (${http.STATUS_CODES[res.statusCode]})`;
               const statusCodeError = new Error(message);
               printErrorMessage(statusCodeError);
           }
    });

    request.on('error', printErrorMessage );
    }catch(error){
        printErrorMessage(error);
    }
}

module.exports.get = getProfile;