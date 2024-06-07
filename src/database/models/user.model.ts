import { Document, Model, model, Schema } from 'mongoose';
import { IUser } from '../../interfaces/user-interface';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { JWT_SECRET } from "../../utilities/secrets";

export default interface IUserModel extends IUser, Document {
  setPassword(password: string): void;
  validPassword(password: string): boolean;
  toAuthJSON(): any;
  token?: string;
}

const userSchema = new Schema({
  username: {
    type: Schema.Types.String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9-_]+$/, 'is invalid'],
    index: true
  },
  email: {
    type: Schema.Types.String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true
  },
  hash: {
    type: Schema.Types.String,
  },
  salt: {
    type: Schema.Types.String,
  },
  role: {
    type: Schema.Types.String,
    required: true,
    enum: ['admin', 'creator', 'reader']
  },
}, { timestamps: true });


userSchema.methods.validPassword = function (password: string): boolean {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

userSchema.methods.setPassword = function (password: string) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

userSchema.methods.toAuthJSON = function (): any {
  return {
    username: this.username,
    email: this.email,
    token: this.generateJWT(),
  };
};

userSchema.methods.generateJWT = function (): string {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: exp.getTime() / 1000,
  }, JWT_SECRET);
};

export const User: Model<IUserModel> = model<IUserModel>('User', userSchema);