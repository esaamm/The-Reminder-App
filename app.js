import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
  path: "./data/config.env",
});

// Using Middlewares
app.use(express.json()); // Use express.json() before using Routes otherwise Routes may not work .

app.use(cookieParser());
app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true, // true krne se hmare header,cookie sb browser ko milte hain jb hm CRUD request krte hain .
}));

// Using Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

app.get("/", (req, res) => {
  res.send("Nice Working");
});

app.use(errorMiddleware); // This handles error using next() block .

// app.post("/users/new" , async (req,res)=>{

//     const { name,email,password } = req.body ;

//     await User.create({
//         name,
//         email,
//         password,
//     });

//     res.status(201).cookie("perk","XXX").json({
//         success: true,
//         message: "Registered Successfully",
//     });
// });

// app.get("/userid" , async (req, res) => {
// //   const { id } = req.body ;
//   const { eh } = req.query ;
//   // form filling fields come here like key value pair . Eg-
//   http://localhost:4000/userid?eh=okhla&id=69
//   // Here eh is key and okhla is value and id is key and 69 is pair and whatever comes in url after ? is a key-value pair and
//   console.log(req.query);

//   // const users = await User.findById( id );

//   // console.log(req.params); // req.params stores dynamic url .

//   res.json({
//     success: true,
//     // users,
//   });
// });

// app.get("/userid/:id", async (req, res) => {
//   const { id } = req.params;
//   // req.params is used in dynamic urls.
//   const users = await User.findById( id );
//   console.log(req.params);
//   console.log(users);

//   res.json({
//     success: true,
//     users,
//   });
// });

// app.get("/user/", async (req, res) => {
//   const { id } = req.body;
//   // req.body reveives what we give in the form .
//   const user = await User.findById(id);
//   console.log(user);

//   res.json({
//     success: false,
//     user,
//   });
// });
