import { model, Schema } from 'mongoose';

interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: 'admin' | 'user';
}

const userSchema = new Schema<IUser>({
  email: { required: true, type: String, unique: true },
  firstName: { required: true, type: String },
  lastName: { required: true, type: String },
  password: { required: true, type: String },
  role: { default: 'user', enum: ['user', 'admin'], type: String },
});

export const User = model<IUser>('User', userSchema);
