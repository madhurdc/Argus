# Argus - GitHub Status Monitoring & Alerting 🛡️

Argus is a real-time, highly-vigilant backend monitoring system and modern frontend dashboard dedicated to tracking the status of GitHub's core services. Named after Argus Panoptes—the many-eyed giant from Greek mythology—the application constantly watches GitHub services and automatically alerts subscribed users via email whenever a service degradation or incident occurs.

## 🌟 Features
- **Continuous Monitoring:** A reliable Node.js cron job automatically scrapes and analyzes the official GitHub Status page every single minute.
- **Change Detection:** Payload hashing instantly detects differences between the live status and the latest database snapshot.
- **Automated Email Alerts:** Seamlessly sends HTML-templated status alert emails to all subscribers using the Resend API.
- **Historical Snapshots:** Safely stores status timelines and alert history in a Supabase PostgreSQL database.
- **Modern Dashboard:** A clean, responsive React frontend powered by Vite and Tailwind CSS v4, displaying live overall statuses, component statuses, and active incidents.
- **Hardened Security:** Built-in protection utilizing Helmet headers, Express rate-limiting, strict CORS policies, and Regex validation across both client and server boundaries.

## 🛠️ Tech Stack
**Frontend:**
- React (via Vite)
- Tailwind CSS v4
- Axios
- Lucide React (Icons)

**Backend:**
- Node.js & Express
- Supabase (PostgreSQL Database)
- Resend (Email API)
- Cheerio (HTML Scraping)
- node-cron (Scheduling)
- Helmet & Express Rate Limit (Security)

## 📂 Project Structure
This repository contains two completely decoupled applications:
- `/backend` - The Express API server and background chron job.
- `/frontend` - The React user interface and subscriber dashboard.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- A [Supabase](https://supabase.com/) project
- A [Resend](https://resend.com/) API Key

### 1. Database Setup (Supabase)
Run the following SQL in your Supabase SQL Editor:
```sql
CREATE TABLE snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payload JSONB NOT NULL,
  hash TEXT NOT NULL,
  checked_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE alerts_table (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  snapshot_id UUID REFERENCES snapshots(id),
  alerts JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file inside `/backend` with your keys:
```env
PORT=5000
RESEND_API_KEY=your_resend_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
FROM_EMAIL=your_verified_resend_email
ORIGIN_URL=http://localhost:5173
```
Start the backend server (runs on Port 5000):
```bash
npm start
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
```
Create a `.env` file inside `/frontend`:
```env
VITE_API_URL=http://localhost:5000/api
```
Start the frontend development server:
```bash
npm run dev
```

Visit `http://localhost:5173` to see the Argus dashboard.

---
*Created as an advanced web monitoring and alerting project.*
