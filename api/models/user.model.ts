import { model, Schema } from 'mongoose';

export interface IUser {
  email: string;
  firstName: string;
  isActive: boolean;
  lastName: string;
  password: string;
  resetPasswordExpire?: Date;
  resetPasswordToken?: string;
  role: 'admin' | 'user';
}

const userSchema = new Schema<IUser>(
  {
    email: {
      lowercase: true,
      required: [true, 'email is required.'],
      trim: true,
      type: String,
      unique: [true, 'email must be unique.'],
    },

    firstName: { required: [true, 'first name is required.'], type: String },

    isActive: {
      default: true,
      type: Boolean,
    },

    lastName: { type: String },

    password: { required: [true, 'password is required.'], select: false, type: String },

    resetPasswordExpire: {
      select: false,
      type: Date,
    },

    resetPasswordToken: {
      select: false,
      type: String,
    },

    role: { default: 'user', enum: ['user', 'admin'], type: String },
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);
