// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out
const username = 'denyschornyi';

//Print message to console
function printMessage(username, badgeCount, points){
  const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
    console.log(message);
}


// Connect to the API URL (https://teamtreehouse.com/denyschornyi.json)
const https = require('https');
const request = https.get(`https://teamtreehouse.com/${username}.json`, (res) => {
    let body = '';
  // Read the data
  res.on('data', d => {
    body += d.toString();
  });

  res.on('end', d => {

    // Parse the data
    // Print the data
    console.dir(body);
  });


});
