import { app } from "./app.js";
import { connectDB } from "./data/database.js";

connectDB();

// console.log(process.env.PORT);
// console.log(process.env.MONGO_URI);
//process.env.PORT = 4000

app.listen(process.env.PORT, () => {
  console.log(`Server is working on PORT ${process.env.PORT} in ${process.env.NODE_ENV} Mode !`);
});