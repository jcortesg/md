import User from "../database/models/user.model";

export interface IUser {
  email: string;
  username: string;
  role: string;
}