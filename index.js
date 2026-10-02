const users = [{
  username: "user1",
  password: "password123"
},{
  username: "john_smith_24",
  password: "securePassword"
}]
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
let userInfo = {};

readline.question("Enter your username: ", (input) => {
  const found = users.find(user => user.username === input);
  if (found) {
    userInfo = found;
    console.log(`Welcome, ${userInfo.username}!`);
    createLoginTracker(userInfo);
  } else {
    console.log("User not found");
    readline.close();
  }
});

function createLoginTracker(userInfo){
  let attemptCount = 0;
  const loginAttempt =  (passwordAttempt) => {
    attemptCount += 1;
    if (attemptCount <= 3){
      if (passwordAttempt === userInfo.password){
        console.log("Login successful");
        readline.close();
      } else {
        console.log(`Attempt ${attemptCount}: Login failed`);
        readline.question("Enter your password: ", loginAttempt);
      }
    } else {
      console.log("Account locked due to too many failed login attempts");
      readline.close();
    }
    }
    readline.question("Enter your password: ", loginAttempt);
}
createLoginTracker(userInfo);

module.exports = {
  ...(typeof createLoginTracker !== 'undefined' && { createLoginTracker })
};