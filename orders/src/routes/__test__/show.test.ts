import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Order, OrderStatus } from "../../models/order";
import { Ticket } from "../../models/ticket";



it(" fetched orders for an partcular user ", async () => {
const ticket = Ticket.build({
        id:new mongoose.Types.ObjectId().toHexString(),
        title: "concert",
        price: 200
    });

    await ticket.save();


const user= global.signin();

const {body:order}=await request(app)
      .post('/api/orders')
      .set('Cookie', user)
      .send({ ticketId:ticket.id })
      .expect(201);

const {body:fetched} = await request(app)
      .get(`/api/orders/${order.id}`)
      .set('Cookie', user)
      .send()
      .expect(200);   

    //expect(fetched.id).toEqual(order.id);
});


it(" returns error if other user trying to get other user's order ", async () => {
    const ticket = Ticket.build({
            id:new mongoose.Types.ObjectId().toHexString(),
            title: "concert",
            price: 200
        });
    
        await ticket.save();
    
    
    const user= global.signin();
    
    const {body:order}=await request(app)
          .post('/api/orders')
          .set('Cookie', user)
          .send({ ticketId:ticket.id })
          .expect(201);
    
    await request(app)
          .get(`/api/orders/${order.id}`)
          .set('Cookie', global.signin())
          .send()
          .expect(401);   
    
        //expect(fetched.id).toEqual(order.id);
    });