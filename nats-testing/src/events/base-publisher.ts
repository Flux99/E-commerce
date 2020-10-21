
import {Message, Stan} from "node-nats-streaming";
import {Subjects} from "./subjects"
import { resolve } from "path";
import { rejects } from "assert";

interface Event{
    subject:Subjects,
    data:any

}

export abstract class Publisher<T extends Event> {
    abstract subject: T["subject"];
    private client:Stan;
   
    constructor(client:Stan){
        this.client=client;
    }
    
    publish(data:T["data"]){

        return new Promise((resolve,reject)=>{
            this.client.publish(this.subject,JSON.stringify(data), (err)=>{
                console.log("Event published");
                if(err){
                    return reject(err);
                }
                console.log("Event publisher to subject", this.subject);
                resolve();                
            });
        });
        
    }
    
}