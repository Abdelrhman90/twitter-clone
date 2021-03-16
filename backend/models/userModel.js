import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide a first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide a last name"],
    },
    username: {
      type: String,
      required: [true, "Please provide a valid username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      select: false,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    retweets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    profilePic: {
      type: String,
      default: "/images/profilePic.png",
    },
    coverPic: {
      type: String,
    },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true }
);

//Hashing the password before saving or updating
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

userSchema.methods.correctPasswords = async function (
  providedPassword,
  userPassword
) {
  return await bcrypt.compare(providedPassword, userPassword);
};

const user = mongoose.model("User", userSchema);

export default user;
