const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
    comments: [Comment]!
    likes: [Like]!
  }
  type Comment {
    id: ID!
    body: String!
    username: String!
    createdAt: String
  }
  type Like {
    id: ID!
    username: String!
    createdAt: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }
  #   registering user for authentication
  type Mutation {
    register(registerInput: RegisterInput): User! #:User means return a user as a response
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Comment!
    createLike(postId: ID!): Post!
  }
`;
