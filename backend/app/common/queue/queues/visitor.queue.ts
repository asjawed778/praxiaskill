import { Queue } from '../bullmq.config';

export const visitorQueue = new Queue('visitor-tracking', {
    connection: require('../bullmq.config').connection,
    defaultJobOptions: {
        removeOnComplete: true,
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 1000
        }
    }
});