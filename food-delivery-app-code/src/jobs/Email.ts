import * as  JobScheduler from 'node-schedule';
// import { NodeMailer } from '../utils/NodeMailer';

export class Email {

    static runEmailJobs() {
        // this.newsletterJob();
    }

    private static newsletterJob() {
        const rule = new JobScheduler.RecurrenceRule();
        // rule.second = 5;
        rule.second = new JobScheduler.Range(0, 59, 5);
        // JobScheduler.scheduleJob('News Letter', '*/5 * * * * *', () => {
        //     console.log('News letter schedule');
        // });
        JobScheduler.scheduleJob('News Letter', rule, () => {
            console.log('News letter schedule');
            // NodeMailer.sendMail({
            //     to: ['nykz786@gmail.com'],
            //     subject: 'Test Email sent',
            //     html: `<h1>Test email is sent. check it</h1>`
            // });
        });
    }

}