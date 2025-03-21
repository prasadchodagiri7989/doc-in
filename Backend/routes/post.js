const { UserModel, PostModel} = require("../models/User"); 
const express = require("express");
const postRouter=express.Router();

const createPost = async (req, res) => {
  try {
    const { userId, text, fileUrl } = req.body;

    // Create a new post
    const newPost = new PostModel({ text, fileUrl });
    await newPost.save();

    // Find the user and update their posts array
    const user = await UserModel.findOneAndUpdate(
      { userId },
      { $push: { posts: newPost._id } },
      { new: true, upsert: true }
    );

    res.status(201).json({ message: "Post created successfully", post: newPost, user });
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;

    // Find the post and populate the user who created it
    const post = await PostModel.findById(postId);
    
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Find the user who created this post
    const user = await UserModel.findOne({ posts: postId });

    res.status(200).json({ post, user });
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

const getUserPosts = async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Find user and populate their posts
      const user = await UserModel.findOne({ userId }).populate("posts");
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.status(200).json({ posts: user.posts });
    } catch (error) {
      res.status(500).json({ error: "Server Error", details: error.message });
    }
};

const getAllPosts = async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: -1 }); // Sort by newest
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: "Error fetching posts", error });
    }
};
  
postRouter.post("/createPost", createPost);
postRouter.get("/getPostById/:postId", getPostById);
postRouter.get('/getUserPosts/:userId', getUserPosts);
postRouter.post('/getAllPosts', getAllPosts);

module.exports = { postRouter };
