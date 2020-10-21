import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import {Order, OrderStatus} from "../../models/order";
import {Ticket} from "../../models/ticket";

const buildTicketOne = async()=>{

    const ticket= Ticket.build({
        id:new mongoose.Types.ObjectId().toHexString(),
        title:"concert",
        price: 200
      });
    
     await ticket.save();
     return ticket;

}


const buildTicketTwo = async()=>{

    const ticket= Ticket.build({
        id:new mongoose.Types.ObjectId().toHexString(),
        title:"EDM",
        price: 500
      });
    
     await ticket.save();
     return ticket;

}


const buildTicketThree = async()=>{

    const ticket= Ticket.build({
        id:new mongoose.Types.ObjectId().toHexString(),
        title:"POP",
        price: 800
      });
    
     await ticket.save();
     return ticket;

}
it(" fetched orders for an partcular user ", async () => {
    // const ticketId = mongoose.Types.ObjectId();
  
    // await request(app)
    //   .post('/api/orders')
    //   .set('Cookie', global.signin())
    //   .send({ ticketId })
    //   .expect(404);

//Create three tickets 

const TicketOne= await buildTicketOne();
const TicketTwo= await buildTicketTwo();
const TicketThree= await buildTicketThree();
// Create one order as USer1
const UserOne =global.signin();
const UserTwo =global.signin();



await request(app)
      .post('/api/orders')
      .set('Cookie', UserOne)
      .send({ ticketId:TicketOne.id })
      .expect(201);


// Create two order as USer2

const {body:OrderOne}= await request(app)
      .post('/api/orders')
      .set('Cookie', UserTwo)
      .send({ ticketId:TicketTwo.id })
      .expect(201);

const {body:OrderTwo}= await request(app)
      .post('/api/orders')
      .set('Cookie', UserTwo)
      .send({ ticketId:TicketThree.id })
      .expect(201);      

// make request to get orders of user 2
const response = await request(app)
                .get('/api/orders')
                .set('Cookie', UserTwo)
                .expect(200);   
// make sure we only got the orders for user 2
//console.log(response.body);


expect(response.body.length).toEqual(2);
expect(response.body[0].id).toEqual(OrderOne.id);
expect(response.body[1].id).toEqual(OrderTwo.id);
expect(response.body[0].ticket.id).toEqual(TicketTwo.id);
expect(response.body[1].ticket.id).toEqual(TicketThree.id);

  });