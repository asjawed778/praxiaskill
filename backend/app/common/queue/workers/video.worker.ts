import { loadConfig } from '../../helper/config.hepler';
import { Worker } from '../bullmq.config';
import { transcodeVideo } from '../../services/AWS.service';
import { updateSubSectionVideo } from '../../../course/course.service';

loadConfig();

const videoWorker = new Worker(
    'video',
    async (job) => {
        const { fileKey, subSectionId, courseName } = job.data;
        const { variants, hlsPlaylist } = await transcodeVideo(fileKey, subSectionId, courseName);
        await updateSubSectionVideo(subSectionId, variants, hlsPlaylist);
    },
    {
        connection: require('../bullmq.config').connection,
    }
);

videoWorker.on('completed', (job) => {
    console.log(`Video transcoded and SubSection updated for subSectionId: ${job.data.subSectionId}`);
});

videoWorker.on('failed', (job, err) => {
    console.error(`Video job failed for subSectionId: ${job?.data.subSectionId}: ${err}`);
});