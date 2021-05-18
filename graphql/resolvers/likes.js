const Post = require("../../models/Post");
const auth = require("../../utils/auth");

module.exports = {
  Mutation: {
    async createLike(_, { postId }, context) {
      try {
        const user = auth(context);
        //find post
        const post = await Post.findById(postId);

        if (post) {
          if (post.likes.find((like) => like.username === user.username)) {
            //post already liked,unlike it
            post.likes = post.likes.filter(
              (like) => like.username !== user.username
            );
          } else {
            //not liked so like the post
            post.likes.push({
              username: user.username,
              createdAt: new Date().toISOString(),
            });
          }
          await post.save();
          return post;
        } else throw new UserInputError("Post not found");
      } catch (e) {
        console.log(e);
      }
    },
  },
};
