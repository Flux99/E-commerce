import { Subjects , OrderCreatedEvent, Publisher } from "@drparadox/common";


export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
subject:Subjects.OrderCreated=Subjects.OrderCreated;
}