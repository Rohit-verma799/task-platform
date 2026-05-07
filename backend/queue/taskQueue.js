import {Queue} from "bullmq"
import redisConnection from "../config/redis.js"

const taskQueue = new Queue("taskQueue",{
    connection: redisConnection
})

export default taskQueue;