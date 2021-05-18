const { AuthenticationError, UserInputError } = require("apollo-server");

// const { findById } = require("../../models/Post");
const Post = require("../../models/Post");
const auth = require("../../utils/auth");
module.exports = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find({}).sort({ createdAt: 1 });
        return posts;
      } catch (e) {
        throw new Error(e);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (e) {
        throw new Error(e);
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const user = auth(context);
      console.log(user);
      //noe we can create post
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();
      return post;
    },
    async deletePost(_, { postId }, context) {
      try {
        const user = auth(context);

        //make sure the logged in user is the creater of the post
        const post = await Post.findById(postId);

        if (user.username === post.username) {
          await post.delete();
          return "Post deleted succesfully";
        } else {
          throw new AuthenticationError("unauthorize to delete the post");
        }
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
