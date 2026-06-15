import "dotenv/config";
import { supabase } from "./src/lib/supabaseClient.js";

async function clean() {
    console.log("Cleaning database snapshots...");
    
    // Deleting all rows from the snapshots table.
    const { error } = await supabase.from('snapshots').delete().not('id', 'is', null);
    
    if (error) {
        console.error("Error cleaning snapshots:", error);
    } else {
        console.log("Successfully wiped all previous snapshots.");
    }
}
clean();
