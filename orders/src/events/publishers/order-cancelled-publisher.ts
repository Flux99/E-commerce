import { Subjects , OrderCancelledEvent, Publisher } from "@drparadox/common";


export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
subject:Subjects.OrderCancelled=Subjects.OrderCancelled;
}