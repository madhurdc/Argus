import { resend } from "../lib/resendClient.js";
import { getUsers } from "./snapshot.js";
import { buildAlertEmail } from "./emailTemplate.js";

export async function sendEmail(to, subject, html){
    try{
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to,
            subject,
            html
        });
    }
    catch(err){
        console.error(err);
    }
}

export async function alert(alerts){
    const html = buildAlertEmail(alerts, new Date().toISOString());

    const users = await getUsers();
    
    for (const user of users) {
        await sendEmail(
            user.email,
            "GitHub Status Changes Detected",
            html
        );
    }
}