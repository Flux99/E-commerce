import {Publisher,Subjects,TicketUpdatedEvent} from "@drparadox/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    subject:Subjects.TicketUpdated = Subjects.TicketUpdated;
}