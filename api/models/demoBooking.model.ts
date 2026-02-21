import { model, Schema, Types } from 'mongoose';

export interface IDemoBoooking {
  email: string;
  name: string;
  phone: string;
  preferredDate: Date;
  preferredTime: string;
  status: 'approved' | 'cancelled' | 'completed' | 'pending';
  userId: Types.ObjectId;
  vehicleId: Types.ObjectId;
}

const demoBookingSchema = new Schema<IDemoBoooking>(
  {
    email: { required: true, type: String },
    name: { required: true, type: String },
    phone: { required: true, type: String },
    preferredDate: { required: true, type: Date },
    preferredTime: { required: true, type: String },
    status: {
      default: 'pending',
      enum: ['approved', 'cancelled', 'completed', 'pending'],
      type: String,
    },
    userId: {
      index: true,
      ref: 'User',
      required: true,
      type: Schema.Types.ObjectId,
    },
    vehicleId: {
      index: true,
      ref: 'Vehicle',
      required: true,
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

demoBookingSchema.index(
  {
    userId: 1,
    vehicleId: 1,
  },
  { unique: true }
);

export const BookingDemo = model<IDemoBoooking>('BookingDemo', demoBookingSchema);
