import nodemailer from 'nodemailer';
import env from '../config/env.js';
const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:env.ADMIN_EMAIL,
        pass:env.APP_PASSWORD
    }
});
const sendEmail=async(email,html,subject)=>{
    return await transporter.sendMail({
        from:env.ADMIN_EMAIL,
        to:email,
        subject,
        html:html
    })
}
export default sendEmail;