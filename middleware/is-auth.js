const jwt = require("jsonwebtoken");

const authUser = (tokenRaw) => {
  const token = tokenRaw.split(" ")[1];
  if (!token || token === "") {
    return { isAuth: false };
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    return { isAuth: false };
  }

  if (!decodedToken) {
    return { isAuth: false };
  }

  userId = decodedToken.userId;
  return { isAuth: true, userId: userId };
};

module.exports = authUser;
