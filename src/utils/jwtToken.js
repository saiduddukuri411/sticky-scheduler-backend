import jwt from "jsonwebtoken";

export const getToken = (tokenObj, secretKey) => {
  return jwt.sign(tokenObj, secretKey);
};


