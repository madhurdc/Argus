import cron from "node-cron";
import fetchHTML from "../services/fetchGithub.js";

export async function startMonitor() {

    fetchHTML();

    cron.schedule('* * * * *', async () => {
        try {
            await fetchHTML();
        }
        catch (error) {
            console.error(error);
        }
    });
}