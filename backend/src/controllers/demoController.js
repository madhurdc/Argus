import { buildDemoEmail } from "../services/emailTemplate.js";
import { sendEmail } from "../services/emailService.js";
import { getLatestSnapshot } from "../services/snapshot.js";

export async function demoAlert(req, res) {
    try {
        const { email } = req.body;

        if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ error: 'Invalid or missing email address' });
        }

        const getData = await getLatestSnapshot();
        if (!getData) {
            return res.status(400).json({
                error: 'No previous snapshot found'
            });
        }
        const data = getData.payload;
        const html = buildDemoEmail(data);

        await sendEmail(
            email,
            'Demo GitHub Status Alert',
            html
        );

        res.status(200).json({
            success: true
        })
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}