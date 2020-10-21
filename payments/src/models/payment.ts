import mongoose from 'mongoose';
// import { OrderStatus } from '@drparadox/common';
// import {updateIfCurrentPlugin} from "mongoose-update-if-current";
//export { OrderStatus };

interface PaymentAttrs {
  orderId: string;
 stripeId: string;
}

interface PaymentDoc extends mongoose.Document {
    orderId: string;
    stripeId: string;
   
}

interface PaymentModel extends mongoose.Model<PaymentDoc> {
  build(attrs: PaymentAttrs): PaymentDoc;
}

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    stripeId: {
        type: Number,
        required: true,
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);
// orderSchema.set("versionKey","version");
// orderSchema.plugin(updateIfCurrentPlugin);
paymentSchema.statics.build = (attrs: PaymentAttrs) => {
  return new Payment(attrs);
};

const Payment = mongoose.model<PaymentDoc, PaymentModel>('Payment', paymentSchema);

export { Payment };
