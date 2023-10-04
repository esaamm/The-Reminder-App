import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  console.log(process.env.NODE_ENV);

  res
    .status(statusCode)
    .cookie("token", token, {
        httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: process.env.NODE_ENV==="Development"?"lax":"none", // sameSite is set to none coz isproject k lye hmara frontend kisi aur url pr hoga and backend kisi aur url pr hoga .
      secure: process.env.NODE_ENV==="Development"?false:true,
      // Jb hm local host chla rhe hon to sameSite lax hona chye and secure false hona chye . But jb hm deploy kr rhe hon to sameSite none set hona chye and secure true hona chye .
    })
    .json({
      success: true,
      message, // message: message
    });
};
