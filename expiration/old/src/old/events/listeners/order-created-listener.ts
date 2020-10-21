import {Subjects ,Listener, OrderCreatedEvent} from "@drparadox/common";
import {queueGroupName} from "./queueGroupName";
import {Message} from "node-nats-streaming";
import {queueExpiration} from "../../queues/expiration-queue";
export class OrderCreatedListener extends Listener<OrderCreatedEvent > {
    subject:Subjects.OrderCreated=Subjects.OrderCreated;
    queueGroupName=queueGroupName;


   async onMessage(data:OrderCreatedEvent["data"],msg:Message){

    await queueExpiration.add(
        {
        orderId:data.id
    },{
        delay:5000,
    }
    );

    msg.ack();

   };
}