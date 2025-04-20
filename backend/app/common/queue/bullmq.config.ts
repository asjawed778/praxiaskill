import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';
import { loadConfig } from '../helper/config.hepler';
loadConfig();

const connection = new IORedis({
  host: process.env.REDIS_HOST || 'redis',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD || undefined,
  maxRetriesPerRequest: null,
});


export { connection, Queue, Worker };
