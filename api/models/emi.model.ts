import { model, Schema, Types } from 'mongoose';

export interface IEmi {
  downPayment: number;
  interestRate: number;
  monthlyEmi: number;
  price: number;
  tenureMonths: number;
  totalInterest: number;
  totalPayable: number;
  vehicleId: Types.ObjectId;
}

const emiSchema = new Schema<IEmi>(
  {
    downPayment: { default: 0, type: Number },
    interestRate: { required: true, type: Number },
    monthlyEmi: { required: true, type: Number },
    price: { required: true, type: Number },
    tenureMonths: { required: true, type: Number },
    totalInterest: { required: true, type: Number },
    totalPayable: { required: true, type: Number },
    vehicleId: {
      index: true,
      required: true,
      type: Schema.Types.ObjectId,
      unique: true,
    },
  },
  { timestamps: true }
);

emiSchema.index({ vehicleId: 1, vehicleType: 1 }, { unique: true });
export const EMI = model<IEmi>('EMI', emiSchema);
