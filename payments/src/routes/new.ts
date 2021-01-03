import express, { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import { requireAuth,
     validateRequest,
     BadRequestError,
     NotFoundError,
     NotAuthorizedError, 
     OrderStatus
     } from '@drparadox/common';
import { Order } from '../models/order';
import {stripe} from "./../stripe";
import {Payment} from "../models/payment";
import {PaymentCreatedPublisher} from '../events/publishers/payment-created-publisher';
import {natsWrapper} from "../nats-wrapper";


const router = express.Router();

router.post("/api/payments", 
requireAuth,
[
    body("token")
    .not()
    .isEmpty(),
    body("orderId")
        .not()
        .isEmpty()
],
validateRequest,

async (req:Request,res:Response) =>{
const {token , orderId}=req.body;

const order = await Order.findById(orderId);
if(!order) {
    throw new NotFoundError();
}
if(order.userId !== req.currentUser?.id){
    throw new NotAuthorizedError();
}

if(order.status === OrderStatus.Cancelled){
    throw new BadRequestError("Cannot pay for a cancelled order");
}

await stripe.customers.create({ 
    email: "test@test.com", 
    source: token, 
    name: 'Abhishek Singh', 
    address: { 
        line1: 'D-21 Rose Villa', 
        postal_code: '400017', 
        city: 'Mumbai', 
        state: 'Maharashtra', 
        country: 'India', 
    } 
}) 
.then((customer) => { 

    return stripe.charges.create({ 
        amount: order.price * 100,    // Charing 
        description: 'Ticket', 
        currency: 'usa', 
        customer: customer.id 
    }); 
}) 
.then(async (charge) => { 
    console.log("charge",charge);
    const payment = Payment.build({
        orderId,
        stripeId:charge.id
    });
    await payment.save();
     new PaymentCreatedPublisher(natsWrapper.client).publish({
        id: payment.id,
        orderId: payment.orderId,
        stripeId:payment.stripeId
    });


    res.status(201).send({id:payment.id}) // If no error occurs 
}) 
.catch((err) => { 
    res.send(err)    // If some error occurs 
}); 
}) 




export {router as createChargeRouter };
