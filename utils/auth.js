const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

module.exports = (context) => {
  //check headers
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (e) {
        throw new AuthenticationError("Invalid ?Expired token");
      }
    }
    throw new Error("Token not found");
  }
  throw new Error("Header must be provided found");
};
