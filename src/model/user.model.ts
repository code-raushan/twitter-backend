import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  comparePassword: (password: string) => boolean;
  getJWT: () => string;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const user = this;
  const SALT = bcrypt.genSaltSync(9);
  const encyptedPassword = bcrypt.hashSync(user.password, SALT);
  user.password = encyptedPassword;
  next();
});
userSchema.methods = {
  comparePassword: function (password: string) {
    return bcrypt.compareSync(password, this.password);
  },
  getJWT: function () {
    const token = jwt.sign(
      { id: this._id, email: this.email },
      'twitter_secret',
      {
        expiresIn: "3h",
      }
    );
    return token as string;
  },
};

export const User = mongoose.model<IUser>("User", userSchema);
