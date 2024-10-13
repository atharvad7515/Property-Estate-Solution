import mongoose from "mongoose";

let connected = false;
// console.log(mongoose.set);
const connectDB = async () => {
  mongoose.set("strictQuery", true);

  //if database is already connected then diont connect again

  if (connected) {
    // console.log("MongoDB is  Connected");
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
  } catch (error) {
    console.log(error);
  }
};
export default connectDB;
