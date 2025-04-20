import { Queue } from '../bullmq.config';

export const emailQueue = new Queue('email', {
  connection: require('../bullmq.config').connection,
});
