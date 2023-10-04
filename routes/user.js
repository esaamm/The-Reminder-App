// import express from "express";
// import { User } from "../models/user.js";

// const router = express.Router();

// router.get("/all" , async (req,res)=>{

//     const users = await User.find({});

//     console.log(req.query);

//     res.status(201).json({
//         success: true ,
//         users ,
//     });
// });

import express from "express";
// import bcrypt from "bcrypt";
// import { User } from "../models/user.js";
import {
  login,
  register,
  getMyProfile,
  logout,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/me", isAuthenticated, getMyProfile);
// router.route("/me").get(getMyProfile);

// OR

// router.get("/userid/:id", getUserDetails);

// router.put("/userid/:id", updateUser);

// router.delete("/userid/:id", deleteUser);

export default router;
