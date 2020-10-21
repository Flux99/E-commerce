import Queue from "bull";
interface Payload{
    orderId: string;
}
const queueExpiration = new Queue<Payload>("dfgdg",{
    redis:{
        host:process.env.REDIS_HOST
    }
});
queueExpiration.process(async (job)=>{
    console.log("I want to ",job.data.orderId);
    
});
export{queueExpiration};