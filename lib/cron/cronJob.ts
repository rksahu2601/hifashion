import { setScheduledProductAsActive } from '@/actions/productActions';
import cron from 'node-cron';

const runCronJob =  ()=>{
    cron.schedule('* * * * *', async()=>{
        await setScheduledProductAsActive()
        console.log('Cron job running every minute');
    }) 
}

export default runCronJob;