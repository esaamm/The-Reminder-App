import mongoose from "mongoose";

export const connectDB = () => {
  //   console.log(process.env.MONGO_URI);

  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "BackendAPP",
    })
    .then((c) => console.log(`Database Connected with ${c.connection.host}`))
    .catch((e) => console.log(e));
};
