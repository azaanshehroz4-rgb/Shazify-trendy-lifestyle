import { Resend } from "resend";


console.log("API KEY:", process.env.RESEND_API_KEY);
export const resend = new Resend(process.env.RESEND_API_KEY);