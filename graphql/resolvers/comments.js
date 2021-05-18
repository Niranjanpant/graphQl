const { UserInputError, AuthenticationError } = require("apollo-server");
const Post = require("../../models/Post");
const auth = require("../../utils/auth");
module.exports = {
  Mutation: {
    async createComment(_, { postId, body }, context) {
      const user = auth(context);
      try {
        if (body.trim() === "") {
          throw new UserInputError("Empty comment", {
            errors: {
              body: "Comment cannot be empty",
            },
          });
        }

        const post = await Post.findById(postId);
        if (post) {
          post.comments.unshift({
            body,
            username: user.username,
            createdAt: new Date().toISOString(),
          });
          await post.save();
          return post;
        } else {
          throw new UserInputError("post not fount");
        }
      } catch (e) {
        console.log(e);
      }
    },

    async deleteComment(_, { postId, commentId }, context) {
      try {
        const user = auth(context);
        //find the post
        const post = await Post.findById(postId);

        if (post) {
          const commentIndex = post.comments.findIndex(
            (c) => c.id === commentId
          );
          //make sure user is the owner of the comment

          if (post.comments[commentIndex].username === user.username) {
            post.comments.splice(commentIndex, 1);
            await post.save();
            return post;
          } else {
            throw new AuthenticationError("Unauthorized to delete");
          }
        } else {
          throw new UserInputError("Post not found");
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
