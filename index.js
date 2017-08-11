let mongoose =require("mongoose");
let rs = require("readline-sync");
let User = require("./models/user.js");

mongoose.connect("mongodb://localhost:27017/userexample");



let username = rs.question("Username: ");
//hideEchoBack hides typing with *
let password = rs.question("Password: ", {hideEchoBack: true});

// let createUser = new User({
//   username: username,
//   //ES6 syntax word = to itself
//   password
// });
//
// createUser.save((err, data)=>{
//   if(err){
//     console.log(err);
//   } else {
//     console.log("New user was saved", data);
//   }
// });

//Test Password
user.findOne({username}, (err, currentUser)=>{
  if(err) {
    console.log(err);
  } else if(currentUser === null){
    console.log("User not found");
  } else {
    currentUser.auth(password, (isCorrect)=>{
      if(isCorrect){
        console.log("Success: username and password are correct");
      } else {
        console.log("Failure: password was incorrect");
      }
    });
  }
});
