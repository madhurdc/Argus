import { supabase } from "../lib/supabaseClient.js"

export async function getLatestSnapshot() {
    const { data, error } = await supabase
        .from('snapshots')
        .select('*')
        .order('checked_at', {
            ascending: false
        })
        .limit(1);

    if (error) {
        console.error('Supabase snapshot read error:', error.message);
        return null;
    }
    return data?.[0] ?? null;
}

export async function saveSnapshot(payload, hash) {
    const { error } = await supabase
        .from('snapshots')
        .insert({
            payload,
            hash
        });

    if (error) {
        console.error('Supabase snapshot save error:', error.message);
    }
}

export async function saveAlerts(alerts) {
    const snapshot = await getLatestSnapshot();
    const snapshot_id = snapshot.id;
    const { error } = await supabase
        .from('alerts_table')
        .insert({
            snapshot_id,
            alerts
        });

    if (error) {
        console.error('Supabase alerts save error', error.message);
    }
}

export async function getUsers() {
    const { data, error } = await supabase
        .from('users')
        .select('email');

    if (error)
        console.error('Supabase user emails fetch error: ', error.message);

    return data;
}

export async function saveUser(email) {
    const { error } = await supabase
        .from('users')
        .insert({
            email
        });

    if (error)
        console.error('Supabase user insert error', error.message);
}