import { Worker } from '../bullmq.config';
import geoip from 'geoip-lite';
import { UAParser } from 'ua-parser-js';
import visitorSchema from '../../../general/visitor.schema';

const visitorWorker = new Worker(
    'visitor-tracking',
    async (job) => {
        const { ip, path, headers } = job.data;

        const userAgent = headers['user-agent'] || '';
        const parser = new UAParser(userAgent);

        const getLocation = (ip: string) => {
            if (!ip || ip === "::1" || ip === "127.0.0.1") {
                return { country: "Local", region: "Local", city: "Local" };
            }
            const geo = geoip.lookup(ip);
            return {
                country: geo?.country || "Unknown",
                region: geo?.region || "Unknown",
                city: geo?.city || "Unknown"
            };
        };

        const visitorData = {
            ip,
            path,
            device: parser.getDevice().type || 'desktop',
            ...getLocation(ip),
            browser: parser.getBrowser().name || "Unknown",
            os: parser.getOS().name || "Unknown"
        };

        await visitorSchema.create(visitorData);
    },
    {
        connection: require('../bullmq.config').connection,
        limiter: {
            max: 100, 
            duration: 1000
        }
    }
);

visitorWorker.on('completed', (job) => {
    console.log(`Visitor tracked: ${job.data.ip}`);
});

visitorWorker.on('failed', (job, err) => {
    console.error(`Visitor tracking failed for ${job?.data.ip}: ${err}`);
});