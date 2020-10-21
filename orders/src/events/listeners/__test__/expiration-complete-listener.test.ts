import { Message } from 'node-nats-streaming';
import mongoose from 'mongoose';
import { ExpirationCompleteEvent, OrderStatus } from '@drparadox/common';
import { ExpirationCompleteListener } from '../expiration-complete-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Ticket } from '../../../models/ticket';
import { Order } from '../../../models/order';


const setup = async () => {
    // create an instance of the listener
    const listener = new ExpirationCompleteListener(natsWrapper.client);
  
    // create a fake data event
   const ticket = Ticket.build({
      id: new mongoose.Types.ObjectId().toHexString(),
      title: 'concert',
      price: 10,
    });
    await ticket.save();
    const order = Order.build({
        status: OrderStatus.Created,
        userId: "awdawda",
        expiresAt:new Date(),
        ticket
    });
    await order.save();
    const data:ExpirationCompleteEvent["data"] = {
        orderId:order.id
    }
    // create a fake message object
    // @ts-ignore
    const msg: Message = {
      ack: jest.fn(),
    };
  
    return { listener, data, msg ,ticket ,order};
  };

  it('creates and saves a order', async () => {
    const { listener, data, msg, order } = await setup();
  
    // call the onMessage function with the data object + message object
    await listener.onMessage(data, msg);
  
    // write assertions to make sure a ticket was created!
    const update = await Order.findById(order.id);
  
    expect(update!.status).toEqual(OrderStatus.Cancelled);

    // expect(ticket!.title).toEqual(data.title);
    // expect(ticket!.price).toEqual(data.price);
  });

  it('emit an OrderCancelled event', async () => {
    const { listener, data, msg, order } = await setup();
  
    // call the onMessage function with the data object + message object
    await listener.onMessage(data, msg);

    expect(natsWrapper.client.publish).toHaveBeenCalled();

    const eventData=JSON.parse(
        (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]);
    expect(eventData.id).toEqual(order.id);
  });

  it('acks the message', async () => {
    const { listener, data, msg } = await setup();
  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);




  // write assertions to make sure ack function is called
    expect(msg.ack).toHaveBeenCalled();


});