import { getLatestSnapshot } from "../services/snapshot.js";

export async function getCurrentStatus(req, res) {
    try {
        const snapshot = await getLatestSnapshot();
        if (!snapshot) {
            return res.status(404).json({ error: "No status snapshot found." });
        }
        res.json({
            mainStatus: snapshot.payload.mainStatus,
            timestamp: snapshot.checked_at
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getComponents(req, res) {
    try {
        const snapshot = await getLatestSnapshot();
        if (!snapshot) {
            return res.status(404).json({ error: "No status snapshot found." });
        }
        
        const subStatus = snapshot.payload.subStatus || [];
        const filtered = subStatus.filter(c => c.name !== "Visit www.githubstatus.com for more information");
        
        res.json(filtered);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getIncidents(req, res) {
    try {
        const snapshot = await getLatestSnapshot();
        if (!snapshot) {
            return res.status(404).json({ error: "No status snapshot found." });
        }
        res.json(snapshot.payload.activeIncidents || []);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
