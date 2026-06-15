import * as cheerio from "cheerio";
import axios from "axios";
import { generateHash, compareHash } from "./hash.js";
import { getLatestSnapshot, saveSnapshot } from "./snapshot.js";

export default async function fetchHTML(){
    try{
        console.log('\nStarting HTML fetch...');
        const url = "https://www.githubstatus.com/";
        
        const response = await axios.get(url);
        const htmlData = response.data;

        const $ = cheerio.load(htmlData);

        await extractData($);
        console.log('Fetch complete.');
    }
    catch(err){
        console.log("Error fetching the website content: " + err.message);
    }
}

async function extractData($){
    const mainStatus = $('.page-status .status').text().trim();
    const subStatus = [];
    const activeIncidents = [];
    
    $('.unresolved-incident').each((i, e) => {
        const titleElement = $(e).find('.incident-title');
        const incident = {
            "id": $(e).attr('id'),
            "name": titleElement.text().trim(),
            "impact": $(titleElement)
            .attr('class')
            ?.split(' ')
            .find(cls => cls.startsWith('impact-'))
            ?.replace('impact-', '')
        };
        activeIncidents.push(incident);
    });
    

    $('.component-inner-container').each((i, e) => {
        const subStat =  {
            "name": $(e).find('.name').text().trim(),
            "status": $(e).attr('data-component-status')
        }
        subStatus.push(subStat);
    });

    const payload = {
        mainStatus,
        subStatus,
        activeIncidents
    }
    await compareHash(payload);
}