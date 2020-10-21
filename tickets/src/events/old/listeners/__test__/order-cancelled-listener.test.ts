import { Message } from 'node-nats-streaming';
import mongoose from 'mongoose';
import { OrderCancelledEvent, OrderStatus } from '@drparadox/common';
import { OrderCancelledListener } from '../order-cancelled-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Ticket } from '../../../models/ticket';

const setup = async () => {
    // Create an instance of the listener
    const listener = new OrderCancelledListener(natsWrapper.client);
  
    // Create and save a ticket
    const orderId =mongoose.Types.ObjectId().toHexString();
    const ticket = Ticket.build({
      title: 'concert',
      price: 99,
      userId: 'asdf',
    });
    ticket.set({orderId})
    await ticket.save();
  
    // Create the fake data event
    const data: OrderCancelledEvent['data'] = {
      id: orderId,
      version: 0,
      status: OrderStatus.Cancelled,
      userId: 'alskdfj',
      expiresAt: 'alskdjf',
      ticket: {
        id: ticket.id,
        price: ticket.price,
      },
    };
  
    // @ts-ignore
    const msg: Message = {
      ack: jest.fn(),
    };
  
    return { listener, ticket,orderId, data, msg };
  };

  it('updated ticket, publish an event, and acks the message', async () => {
    const { listener, ticket,orderId, data, msg } = await setup();
  
    await listener.onMessage(data, msg);
  
    const updatedTicket = await Ticket.findById(ticket.id);
  
    expect(updatedTicket!.orderId).not.toBeDefined();
    expect(msg.ack).toHaveBeenCalled();
    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });