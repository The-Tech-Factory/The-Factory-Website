import { mailTrapClient, sender } from "./mailtrap.config.js";
import dotenv from "dotenv"
dotenv.config()

export const sendWelcomeEmail = async (email, firstName) => {
    const recipients = [{ email }];

    try {
        const response = await mailTrapClient.send({
            from: sender,
            to: recipients,
            template_uuid: process.env.MAILTRAP_TEMPLATE_UUID,
            template_variables: {
                company_info_name: "The Tech Factory",
                name: firstName
            }
        })

        console.log("Welcome email sent successfully", response);
            
    } catch (error) {
        console.error("Error sending welcome email", error);
        throw new Error(`Error sending welcome email: ${error}`)
    }
}
