import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({email, emailType, userId}: any) => {
    try {
        
        // create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId, {
              verifyToken: hashedToken,
              verifyTokenExpiry: Date.now() + 3600000,
            });
        } else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId, {
              forgetPasswordToken: hashedToken,
              forgetPasswordTokenExpiry: Date.now() + 3600000,
            });
        }

        const transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "3fd6280f36ce73",
            pass: "e6ae6cc8d67351",
            //TODO: add this credentials to .env file
          },
        });

        const mailOptions = {
          from: "mrhellion411@gmail.com",
          to: email,
          subject:
            emailType === "VERIFY"
              ? "Verify your email"
              : "Reset your password",
          html:
            emailType === "VERIFY"
              ? `<p> Click <a href = "${
                  process.env.DOMAIN
                }/verifyemail?token=${hashedToken}">here</a> to ${
                  emailType === "VERIFY"
                    ? "verify your email"
                    : "reset your password"
                }
            or copy and paste the link below in your browser. </br> ${
              process.env.DOMAIN
            }/verifyemail?token=${hashedToken}
            </p>`
              : `<p> Click <a href = "${
                  process.env.DOMAIN
                }/resetpassword?token=${hashedToken}">here</a> to ${
                  emailType === "VERIFY"
                    ? "verify your email"
                    : "reset your password"
                }
            or copy and paste the link below in your browser. </br> ${
              process.env.DOMAIN
            }/resetpassword?token=${hashedToken}
            </p>`,
        };

        const mailresponse = await transport.sendMail(mailOptions);

        return mailresponse;


    } catch (error:any) {
        throw new Error(error.message)
    }
}