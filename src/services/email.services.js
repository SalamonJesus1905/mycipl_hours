import nodemailer from 'nodemailer';
import config from '../config/config.js';

const forgetEmail = async (data) => {
    const user = data.data
    const base = config.base_url
    var transport = nodemailer.createTransport({
        host: config.mail.host,
        port: config.mail.port,
        auth: {
          user: config.mail.user,
          pass: config.mail.password
        }
      });
      console.log(user.email)
    var mailOptions = {
        from: config.mail.from,
        to: user.email,
        subject: "FORGET PASSWORD",
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reset Your Password Request</title>
            <style>
                body {
                    font-family: sans-serif;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    padding: 20px;
                    max-width: 600px;
                    margin: 0 auto;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                }
                h1 {
                    text-align: center;
                    margin-bottom: 20px;
                }
                p {
                    line-height: 1.5;
                }
                a {
                    color: #333;
                    text-decoration: none;
                    border-bottom: 1px solid #ddd;
                    padding-bottom: 5px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Reset Your Password Request</h1>
                <p>
                    Hi ${user.email},
                </p>
                <p>
                    You recently requested to reset your password for your account. If you requested this reset, you can create a new password by clicking the link below:
                </p>
                <p>
                    <a href="${base}/v1/auth/resetPassword/${user.resetToken}">Reset Password</a>
                </p>
                <p>
                    **Please note:** This link will expire in [duration, e.g., 15 minutes]. If you don't use it within that timeframe, you'll need to request a new password reset.
                </p>
                <p>
                    If you didn't request a password reset, you can safely ignore this email. Your password will remain the same.
                </p>
                <p>
                    For your security, we recommend choosing a strong password that is unique to this account.
                </p>
                <p>
                    Thanks,
                </p> 
                <p>
                    The MYCIPL HOURS Team
                </p>
            </div>
        </body>
        </html>
        `,
    }

    transport.sendMail(mailOptions, function (error, info) {
        if (error) {
            return error;
        } else {
            return info.response
        }
    });

}

export default { forgetEmail }