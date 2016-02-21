module.exports = function(mongoose){

  var UserSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}]
  });

  var User = mongoose.model("User", UserSchema);

  return User;
};