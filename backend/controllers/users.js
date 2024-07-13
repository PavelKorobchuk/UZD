const jwt = require("jsonwebtoken");
const { User, AuthRefreshToken } = require("../models");
const { jwtSign, jwtVerify } = require("../helper/jwt");
const { bcryptHash, bcryptCompare } = require("../helper/bcrypt");
const {
  ValidationError,
  FieldRequiredError,
  AlreadyTakenError,
  ForbiddenError,
  UnauthorizedError,
  InternalServerError
} = require("../helper/customErrors");

const { TokenExpiredError } = jwt;

// Register
const signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username) throw new FieldRequiredError(`A username`);
    if (!email) throw new FieldRequiredError(`An email`);
    if (!password) throw new FieldRequiredError(`A password`);

    const userExists = await User.findOne({
      where: { email },
    });
    if (userExists) throw new AlreadyTakenError("Email", "is already in use");

    const newUser = await User.create({
      email: email,
      username: username,
      password: await bcryptHash(password),
    }, {exclude: ['password']});

    const accessToken = jwtSign(newUser, process.env.JWT_EXPIRATION);
    const refreshToken = jwtSign(newUser, process.env.JWT_REFRESH_EXPIRATION);

    // create record in database to store refresh_token
    await AuthRefreshToken.create({
      email,
      username,
      refresh_token: refreshToken
    });

    res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
      .header('Authorization', accessToken)
      .json({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      access_token: accessToken,
  });
  } catch (error) {
    next(error);
  }
};

// Login
const signIn = async (req, res, next) => {
  try {
    const user = req.body;

    const existentUser = await User.findOne({ where: { email: user.email }, exclude: ['password'] });
    if (!existentUser) throw new UnauthorizedError("Email", "sign up first");

    const pwd = await bcryptCompare(user.password, existentUser.password);
    if (!pwd) throw new ValidationError("Wrong email/password combination");

    const accessToken = jwtSign(existentUser, process.env.JWT_EXPIRATION);
    const refreshToken = jwtSign(existentUser, process.env.JWT_REFRESH_EXPIRATION);

    // create record in database to store refresh_token
    const refreshTokenObj = await AuthRefreshToken.create({
      email: existentUser.email,
      username: existentUser.username,
      refresh_token: refreshToken
    });

    res
      .cookie('refreshToken', refreshTokenObj.refresh_token, { httpOnly: true, sameSite: 'strict' })
      .header('Authorization', accessToken)
      .json({
        id: existentUser.id,
        username: existentUser.username,
        email: existentUser.email,
        access_token: accessToken,
    });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  let refreshToken;
  const refreshTokenFromHeaders = req.cookies['refreshToken'];
  if (!refreshTokenFromHeaders) {
      // return res.status(403).send("Refresh Token is required!");
      throw new UnauthorizedError('Refresh Token is required!')
  }

  try {
      // console.log('refreshToken.refresh_token', refreshTokenFromHeaders) 
      refreshToken = await AuthRefreshToken.findOne({ where: { refresh_token: refreshTokenFromHeaders } });

      if (!refreshToken) {
          // res.status(403).send("Invalid refresh token");
          // return;
          next(new ForbiddenError('Invalid refresh token'))
      }
      
      await jwtVerify(refreshToken.refresh_token);
      
      const user = await User.findOne({ where: { email: refreshToken.email }, exclude: ['password'] });
      
      let newAccessToken = jwtSign(user, process.env.JWT_REFRESH_EXPIRATION,);

      return res
        .cookie('refreshToken', refreshToken.refresh_token, { httpOnly: true, sameSite: 'strict' })
        .header('Authorization', newAccessToken)
        .json({
          access_token: newAccessToken,
      });
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      refreshToken?.refresh_token ?? await AuthRefreshToken.destroy({ where: { refresh_token: refreshToken.refresh_token } });
      next(new ForbiddenError('Refresh token was expired. Please make a new sign in request'))
    }
    next(new InternalServerError('Internal server error'));
  }
}

module.exports = { signUp, signIn, refreshToken };