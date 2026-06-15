import "dotenv/config"
import app from "./server.js";
import { startMonitor } from "./src/jobs/monitor.js";

app.listen(process.env.PORT, console.log('Server Running...'));

startMonitor();