let mongoose =require("mongoose");
let bcrypt = require("bcrypt");
let salt = bcrypt.genSaltSync(10);

let Schema = mongoose.Schema;


let userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre("save", function(next) {
  this.password = bcrypt.hashSync(this.password + this.username, salt);
  next();
});

//cb = callback
userSchema.methods.auth = function(passwordAttempt, cb){
  bcrypt.compare(passwordAttempt + this.username, this.password, (err, result)=>{
    if(err){
      console.log(err);
      cb(false);
    } else if(result) {
      //if passwords were the same
      cb(true);
    } else {
      //if passwords were different
      cb(false);
    }
  });
}

module.exports = mongoose.model("users", userSchema);
