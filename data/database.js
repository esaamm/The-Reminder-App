import mongoose from "mongoose";

export const connectDB = () => {
//   console.log(process.env.MONGO_URI);

  mongoose
    .connect("mongodb://127.0.0.1:27017", {
      dbName: "BackendAPP",
    })
    .then(() => console.log("Database Connected"))
    .catch((e) => console.log(e));
};
