import {Publisher,Subjects,TicketCreatedEvent} from "@drparadox/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subject:Subjects.TicketCreated = Subjects.TicketCreated;
}