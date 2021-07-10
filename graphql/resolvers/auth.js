//model
const User = require("../../model/user");
const safeAwait = require("safe-await");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  createUser: async (args) => {
    const { email, password } = args.userInput;

    const [error, emailTaken] = await safeAwait(User.findOne({ email: email }));

    if (emailTaken) {
      throw new Error("Email Taken already");
      // error.data = "";
      // error.code = 401;
      // throw error;
    }

    const hasedPassword = await bcrypt.hash(password, 12);

    const userData = new User({
      email: email,
      password: hasedPassword,
    });

    const user = await userData.save();

    return {
      ...user._doc,
      createdEvents: events.bind(this, user.createdEvents),
    };
  },

  login: async ({ email, password }) => {
    //check if user exist
    const [error, user] = await safeAwait(User.findOne({ email: email }));

    if (error) throw new Error("User Fetch Server Error In login " + error);

    if (!user) throw new Error("User not exists");

    const [error2, passwordEqual] = await safeAwait(
      bcrypt.compare(password, user.password)
    );

    if (error2) throw new Error("Bcrypt Error " + error2);

    if (!passwordEqual) throw new Error("Password Incorrect");

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    return {
      userId: user._id,
      token: token,
      tokenExpiration: 1,
    };
  },
};
