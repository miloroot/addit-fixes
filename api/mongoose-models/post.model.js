module.exports = function(mongoose){

  var PostSchema = mongoose.Schema({
    content: {type: String, required: true},
    images: [String],
    videos: [String],
    tags: [String],
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    createdAt: Date,
    updatedAt: Date
  });

  var Post = mongoose.model("Post", PostSchema);

  return Post;
};
