import { Message } from 'node-nats-streaming';
import mongoose from 'mongoose';
import { TicketUpdatedEvent } from '@drparadox/common';
import { TicketUpdatedListener } from '../ticket-updated-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Ticket } from '../../../models/ticket';

const setup = async () => {
  // create an instance of the listener
  const listener = new TicketUpdatedListener(natsWrapper.client);



  const ticket = Ticket.build({
    id:new mongoose.Types.ObjectId().toHexString(),
    title:"dawdaw",
    price:20
  });
  await ticket.save();  



  // create a fake data event
  const data: TicketUpdatedEvent['data'] = {
    id: ticket.id,
    version: ticket.version  +1 ,
    title:"new concert",
    price: 900,
    userId: "dawdawfdsd",
  };

  // create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg ,ticket};
};

it('finds,update and save ticket', async () => {
  const { listener, data,ticket, msg } = await setup();

//   // call the onMessage function with the data object + message object
   await listener.onMessage(data, msg);

//   // write assertions to make sure a ticket was created!
   const updatedticket = await Ticket.findById(ticket.id);

  //expect(updatedticket).toBeDefined();
  expect(updatedticket!.title).toEqual(data.title);
  expect(updatedticket!.price).toEqual(data.price);
  expect(updatedticket!.version).toEqual(data.version);
});

it('acks the message', async () => {
     const { listener, data, msg } = await setup();
//   // call the onMessage function with the data object + message object
   await listener.onMessage(data, msg);




//   // write assertions to make sure ack function is called
     expect(msg.ack).toHaveBeenCalled();


});
it('does not acks the message', async () => {
  const { listener, data, msg } = await setup();
//   // call the onMessage function with the data object + message object


data.version=123;




try{
  await listener.onMessage(data, msg);
}catch{

}

//   // write assertions to make sure ack function is called
  expect(msg.ack).not.toHaveBeenCalled();


});



