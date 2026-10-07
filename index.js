const mockUser = {
  "username": "user1",
  "password": "password123"
}
const mockUser2 = {
  "username": "john_smith_24",
  "password": "securePassword"
}


function createLoginTracker(userInfo) {
  let failedAttempts = 0;
  let isLocked = false;

  return function(passwordAttempt) {
    if (isLocked) {
      return 'Account locked due to too many failed login attempts';
    }

    if (passwordAttempt === userInfo.password) {
      failedAttempts = 0;
      return 'Login successful';
    } else {
      failedAttempts++;
      
        if (failedAttempts > 3) {
          isLocked = true;
          return 'Account locked due to too many failed login attempts';
        } else {
          return `Attempt ${failedAttempts}: Login failed`;
        }
      }
    }
  };


const user1Login = createLoginTracker({ username: "user1", password: "password123" });
console.log(user1Login("wrongPassword")); 
console.log(user1Login("wrongPassword")); 
console.log(user1Login("wrongPassword")); 
console.log(user1Login("wrongPassword")); 




module.exports = {
  ...(typeof createLoginTracker !== 'undefined' && { createLoginTracker })
};