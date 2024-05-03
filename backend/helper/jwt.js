const jwt = require("jsonwebtoken");
const privateKey = process.env.JWT_KEY;

module.exports.jwtSign = (payload, expiresIn) => {
  try {
    return jwt.sign(
     { username: payload.username, email: payload.email },
     privateKey,
     {
       expiresIn
     }
   );
  }
  catch(err) {
    throw new Error();
  }
};

module.exports.jwtVerify = async (token) => {
  return jwt.verify(token, privateKey);
};