import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User Already Exists !", 404));
    // if (user)
    //   return res.status(404).json({
    //     success: false,
    //     message: "User Already Exist",
    //   });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedPassword });
    console.log(user);

    //  const { id } = user ;
    //  console.log(id);
    sendCookie(user, res, "Successfully Registered", 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password"); // Now after selecting password we can access password also using user.password otherwise we had not been able to access password using user.password below .

    if (!user)
      return next(new ErrorHandler("Invalid Email or Password !", 404));
    // if (!user)
    //   return res.status(404).json({
    //     success: false,
    //     message: "Invalid Email or Password",
    //   });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password !", 404));
    // if (!isMatch)
    //   return res.status(404).json({
    //     success: false,
    //     message: "Invalid Email or Password",
    //   });

    sendCookie(user, res, "Loggedin Successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none", // sameSite is set to none coz isproject k lye hmara frontend kisi aur url pr hoga and backend kisi aur url pr hoga .
      secure: process.env.NODE_ENV === "Development" ? false : true,
      // Jb hm local host chla rhe hon to sameSite lax hona chye and secure false hona chye . But jb hm deploy kr rhe hon to sameSite none set hona chye and secure true hona chye .
    })
    .json({
      success: true,
      user: req.user,
    });
};

// export const getAllUsers = async (req, res) => {
//   const users = await User.find({});

//   // console.log(req.query);

//   res.status(201).json({
//     success: true,
//     users,
//   });
// };

// export const updateUser = async (req, res) => {
//   const { id } = req.params;
//   const user = await User.findById(id);

//   // console.log(req.query);

//   res.json({
//     success: true,
//     message: "Updated",
//   });
// };

// export const deleteUser = async (req, res) => {
//   const { id } = req.params;
//   const user = await User.findById(id);

//   // await User.remove({ user });

//   res.json({
//     success: true,
//     message: "Deleted",
//   });
// };

// const getAllUsers = async (req, res) => {
//   const { id } = req.body;
//   // req.body reveives what we give in the form .
//   const user = await User.findById(id);
//   console.log(user);

//   res.json({
//     success: false,
//     user,
//   });
// };

// export const specialFunc = (req, res) => {
//   res.json({
//     success: true,
//     message: "Just kidding",
//   });
// };

// export const getUserDetails = async (req, res) => {
//   const { id } = req.params;
//   // req.params is used in dynamic urls.
//   const user = await User.findById(id);
//   console.log(req.params);
//   console.log(user);

//   res.json({
//     success: true,
//     user,
//   });
// };

// export const register = async (req, res) => {
//   const { name, email, password } = req.body;

//   await User.create({
//     name,
//     email,
//     password,
//   });

// res.status(201).cookie("perk", "XXX").json({
//   success: true,
//   message: "Registered Successfully",
// });
