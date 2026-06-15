import { saveUser } from "../services/snapshot.js"

export async function saveController(req, res) {

    try {
        const { email } = req.body;
        
        if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ error: 'Invalid or missing email address' });
        }

        await saveUser(email);

        res.json({
            success: true
        });
    }
    catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}