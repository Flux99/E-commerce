import { Subjects , ExpirationCompleteEvent, Publisher } from "@drparadox/common";


export class ExpirationCompletedPublisher extends Publisher<ExpirationCompleteEvent>{
subject:Subjects.ExpirationComplete=Subjects.ExpirationComplete;
}