import {Message} from "node-nats-streaming";
import {Listener} from "./base-listener"
import {Subjects} from "./subjects"
import {TicketCreatedEvent} from "./ticket-created-event"
export class TicketCreatedListener extends Listener<TicketCreatedEvent>{
    readonly  subject:Subjects.TicketCreated =Subjects.TicketCreated
    queueGroupName="group1"
    onMessage(data:any,msg:Message){
        console.log("Event Data",data);
        msg.ack();
    }
}