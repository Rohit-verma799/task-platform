import { Worker } from "bullmq";
import redisConnection from "../config/redis.js";

const worker = new Worker(
  "taskQueue",
  async (job) => {
    console.log("Job received:", job.data);
  },
  {
    connection: redisConnection,
  }
);