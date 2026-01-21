import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // 1. Token Create Karein
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        // 2. Database Update Karein (Corrected Syntax & added await)
        if (emailType === "verify") {
            await User.findByIdAndUpdate(userId, { // ID pehle aayega
                verifyToken: hashedToken,
                verifyTokenExpiry: new Date(Date.now() + 3600000)
            });
        } else if (emailType === "forgetPassword") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: new Date(Date.now() + 3600000)
            });
        }

        // 3. Transport Config
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.mailtrapUsername,
                pass: process.env.mailTrapPassword
            }
        });

        // 4. Mail Options (Fixed "verify" logic)
        const mailOptions = {
            from: "yamitniranjan@gmail.com",
            to: email,
            subject: emailType === "verify" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.domain}/verifyemail?token=${hashedToken}">here</a> to ${
                emailType === "verify" ? "verify your email" : "reset your password"
            }</p>`
        };

        // 5. Send Email
        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;

    } catch (err: any) {
        console.error(err.message);
        throw new Error(err.message);
    }
}