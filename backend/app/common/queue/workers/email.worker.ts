import Mail from 'nodemailer/lib/mailer';
import { loadConfig } from '../../helper/config.hepler';
import { sendEmail } from '../../services/email.service';
import { Worker } from '../bullmq.config';
loadConfig();

const emailWorker = new Worker(
  'email',
  async (job) => {
    const {
      from,
      to,
      subject,
      html,
      text,
      attachments,
      cc,
      bcc,
      replyTo,
    } = job.data;

    const defaultFrom = `Praxia Skill <${process.env.MAIL_USER}>`;
    const formattedFrom = from
      ? `Praxia Skill <${from}>`
      : defaultFrom;

    const emailOptions: Mail.Options = {
      from: formattedFrom,
      to,
      subject,
      ...(html && { html }),
      ...(text && { text }),
      ...(attachments && { attachments }),
      ...(cc && { cc }),
      ...(bcc && { bcc }),
      ...(replyTo && { replyTo }),
    };

    await sendEmail(emailOptions);
  },
  {
    connection: require('../bullmq.config').connection,
  }
);


emailWorker.on('completed', (job) => {
  console.log(`Email sent to ${job.data.to}`);
});

emailWorker.on('failed', (job, err) => {
  console.error(`Email job failed for ${job?.data.to}: ${err}`);
});
