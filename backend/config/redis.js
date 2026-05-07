import Redis from 'ioredis'

const redisConnection = new Redis({
    host: "localhost",
    port: 6379,
    maxRetriesPerRequest: null
})

redisConnection.on("connect", ()=>{
    console.log("Redis Connected");
})

redisConnection.on("error", (err)=>{
  console.log("Redis Error", err)
})

export default redisConnection