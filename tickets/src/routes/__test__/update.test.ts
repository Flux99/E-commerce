import request from "supertest";
import {app} from "../../app";
import  mongoose  from "mongoose";
import {Ticket} from "../../models/ticket";

it("return a 404 if the provided id does not exist", async()=>{

const id = new mongoose.Types.ObjectId().toHexString();
await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie",global.signin())
    .send({
        title: "adadad",
        price: 20
    })
    .expect(404)
});

it("return a 401 if the user is not authenticated", async()=>{

    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
    .put(`/api/tickets/${id}`)
    .send({
        title: "adadad",
        price: 20
    })
    .expect(401)
});
it("return a 401 if the user does not own the ticket", async()=>{
  const response =  await request(app)
    .post("/api/tickets/")
    .set("Cookie",global.signin())
    .send({
        title: "adadad",
        price: 20
    });
    
    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signin())
    .send({
        title: "dragon",
        price: 546
    })
    .expect(401)
});
it("return a 400 if the user provides an invlid title or price", async()=>{

const cookie =global.signin()

    const response =  await request(app)
    .post("/api/tickets/")
    .set("Cookie",cookie)
    .send({
        title: "adadad",
        price: 20
    });
    
    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie",cookie)
    .send({
        title: "",
        price: 546
    })
    .expect(400)
});
it("updates the ticket provides an invalid title or price ", async()=>{
    const cookie = global.signin();

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'asldkfj',
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'new title',
      price: 100,
    })
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send();

  expect(ticketResponse.body.title).toEqual('new title');
  expect(ticketResponse.body.price).toEqual(100);
});
it("rejects edit if ticket is reserved", async()=>{
  const cookie = global.signin();

const response = await request(app)
  .post('/api/tickets')
  .set('Cookie', cookie)
  .send({
    title: 'asldkfj',
    price: 20,
  });

  const ticket= await Ticket.findById(response.body.id);
  ticket!.set({orderId: mongoose.Types.ObjectId().toHexString()})
  await ticket!.save();

  await request(app)
   .put(`/api/tickets/${response.body.id}`)
   .set('Cookie', cookie)
   .send({
     title: 'new title',
     price: 100,
   })
   .expect(400);
});
