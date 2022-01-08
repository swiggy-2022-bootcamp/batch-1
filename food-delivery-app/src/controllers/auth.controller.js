const httpStatus = require('http-status');
// const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService } = require('../services');

// const extractUserInfo = (user) => {
//   const { id, username, email, password, address, walletMoney } = user;
//   return {
//     id,
//     username,
//     email,
//     password,
//     address,
//     walletMoney,
//   };
// };

const register = async (req, res, next) => {
  const body = req.body;
  const user = await userService.createUser(body);
  if (user) {
    if (user.isEmailTaken) {
      await res.status(httpStatus.OK);
      await res.send({ message: 'Email already taken' });
      // httpStatus.OK, 'Email already taken'
    } else if (user.isIdTaken) {
      await res.send({ message: 'Id already taken' });
    } else {
      const tokens = await tokenService.generateAuthTokens(user);
      // const userData = extractUserInfo(user);
      const data = {
        user,
        tokens,
      };
      await res.status(httpStatus.CREATED);
      await res.send(data);
    }
  } else {
    await res.status(httpStatus.INTERNAL_SERVER_ERROR);
    await res.send({ message: 'Something went wrong' });
  }
};

const login = async (req, res, next) => {
  const body = req.body;
  const user = await authService.loginUserWithEmailAndPassword(
    body.email,
    body.password
  );

  if (user) {
    const tokens = await tokenService.generateAuthTokens(user);
    // const userData = extractUserInfo(user);
    const data = {
      user,
      tokens,
    };
    await res.status(httpStatus.OK);
    await res.send(data);
  } else {
    await res
      .status(httpStatus.UNAUTHORIZED)
      .send('Incorrect email or password');
  }
};

module.exports = {
  register,
  login,
};
