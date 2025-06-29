import { Queue } from '../bullmq.config';

export const videoQueue = new Queue('video', {
  connection: require('../bullmq.config').connection,
});