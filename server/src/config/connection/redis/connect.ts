import { createClient, RedisClientOptions, RedisClientType } from 'redis';

//Create options
const options = {
    url:`redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    password: process.env.REDIS_PASSWORD,
} as RedisClientOptions;    

//Crate cliente
const redisClient = createClient(options);

redisClient.on('connect',()=>{
    console.log('REDIS: Connected');
    
});    
//Connect
redisClient.connect()
    .then(res=>{
        console.log('Redis: Client Connect done ✔: ', res);
    }).catch(err=>{
        console.error('ERROR: during REDIS client connection: ', err);
    });

// Exportamos
export { redisClient }; 