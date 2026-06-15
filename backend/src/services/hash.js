import crypto from 'crypto';
import { alert } from './emailService.js';
import { getLatestSnapshot, saveAlerts, saveSnapshot } from './snapshot.js';
import { whatChanged } from './statusChange.js';

export function generateHash(payload){
    return crypto
    .createHash('sha256')
    .update(JSON.stringify(payload))
    .digest('hex');
}

export async function compareHash(payload){
    const currentHash = generateHash(payload);
    const getData = await getLatestSnapshot();
    if(!getData){
        await saveSnapshot(payload, currentHash);
        return;
    }
    const data = getData.payload;
    const previousHash = getData?.hash;

    if(!previousHash){
        await saveSnapshot(payload, currentHash);
        return;
    }

    if(previousHash !== currentHash){
        const newAlerts = whatChanged(payload, data);
        await saveSnapshot(payload, currentHash);
        if(newAlerts.length > 0){
            await saveAlerts(newAlerts);
            await alert(newAlerts);
        }
        return;
    }
}