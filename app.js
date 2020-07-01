// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out
const https = require('https');

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
    });

    request.on('error', printErrorMessage );
    }catch(error){
        printErrorMessage(error);
    }
}

let users = process.argv.slice(2);

users.forEach(username => {
    getProfile(username);
} );
// getProfile('denyschornyi');
