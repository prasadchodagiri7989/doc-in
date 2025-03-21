const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    fileUrl: { type: String }, // Cloudinary File Link
  },
  { timestamps: true } // Auto adds createdAt & updatedAt
);

const PostModel = mongoose.model("Post", PostSchema);


// User Schema
const UserSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }], // References Post model
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = { UserModel, PostModel };
