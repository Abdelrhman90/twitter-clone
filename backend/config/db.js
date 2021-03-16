import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const con = await mongoose.connect(
      "mongodb+srv://abdelrhman:abbady123@natours.qcfgd.mongodb.net/tweeter?retryWrites=true&w=majority",
      {
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
