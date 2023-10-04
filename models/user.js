import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // Means jab hm user ko database se access krenge to vha password nhi ayega user.password krne par so hme password manually select krna hoga . 
    // Manually select hm aise krte hain : const user = await User.findOne({ email }).select("+password");  // Means user ka jo bhi data phle se mil rha tha vo to mile hi sath me password bhi mile . 
    // Agar hm "+password" ki jga "email" ,etc likh den to sirf email hi milega hame .
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model("User", schema);
// collection(table) name is User .
