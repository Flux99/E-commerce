import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Order, OrderStatus } from "../../models/order";
import { Ticket } from "../../models/ticket";
import {natsWrapper} from "../../nats-wrapper";


it(" mark order as Cancelled ", async () => {
    const ticket = Ticket.build({
            id:new mongoose.Types.ObjectId().toHexString(),
            title: "concert",
            price: 200
        });
    
        await ticket.save();
    
    
    const user= global.signin();
    
    const {body:order} = await request(app)
          .post('/api/orders')
          .set('Cookie', user)
          .send({ ticketId:ticket.id })
          .expect(201);
    
    const {body:orderCancelled}  = await request(app)
          .delete(`/api/orders/${order.id}`)
          .set('Cookie', user)
          .send()
          .expect(204);   
    const updateOrder =await Order.findById(order.id);
    expect(updateOrder!.status).toEqual(OrderStatus.Cancelled);
    });


    it("emit a order cancelled event",async()=>{
      const ticket = Ticket.build({
            id:new mongoose.Types.ObjectId().toHexString(),
            title: "concert",
            price: 200
        });
    
        await ticket.save();
    
    
    const user= global.signin();
    
    const {body:order} = await request(app)
          .post('/api/orders')
          .set('Cookie', user)
          .send({ ticketId:ticket.id })
          .expect(201);
    
    const {body:orderCancelled}  = await request(app)
          .delete(`/api/orders/${order.id}`)
          .set('Cookie', user)
          .send()
          .expect(204);  

  expect(natsWrapper.client.publish).toHaveBeenCalled();
    });