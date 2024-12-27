import bcryptjs from 'bcryptjs';
import User from '@/models/userModel';
import nodemailer from 'nodemailer';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {

        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        if (emailType === "Verify") {
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                }
            )
        } else if (emailType === "Reset") {
            await User.findByIdAndUpdate(userId,
                {
                    forgetPasswordToken: hashedToken,
                    forgetPasswordTokenExpiry: Date.now() + 3600000
                }
            )
        }



        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "4c6e5f0d8ed4fd",
                pass: "82d938ef18b488"
            }
        });


        const optionmail = {
            from: 'jambhaleaditya63@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType === 'Verify' ? "Verify Your Email" : "Reset Your Password",
            html: `<p>Click <a href="${process.env.NEXT_PUBLIC_DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === 'Verify' ? "Verify Your Email" : "Reset Your Password"} or copy and paste the link below in your browser.<br>${process.env.NEXT_PUBLIC_DOMAIN}/verifyemail?token=${hashedToken}
            </p>`, // html body
        }
        const mailRepsonse = await transporter.sendMail(optionmail);
        return mailRepsonse;


    } catch (error: any) {
        throw new Error(error.message)
    }
}


