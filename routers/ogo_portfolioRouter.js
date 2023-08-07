import express from 'express';
import expressAsyncHandler from "express-async-handler"
import nodemailer from "nodemailer"
import fs from "fs/promises"

const ogo_portfolioRouter = express.Router();

// @desc  send email 
// @route post /api/ogo_portfolio/contact_us_email
// @access Public
ogo_portfolioRouter.post('/contact_us_email', expressAsyncHandler(async (req, res) => {
        
        const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                        user: process.env.NEXT_PUBLIC_NODEMAIL_EMAIL,
                        pass: process.env.NEXT_PUBLIC_NODEMAIL_PASS,
                }
        })

        const template = await fs.readFile('./templates/Portfolio_thanks_email.html', 'utf-8');

        const emailHtml = ( htmlData, iscustomer ) => {
                return template
                        .replace('{{subtitle_header_holder}}', iscustomer ? `You reached out!` : `Client has reached out!`)
                        .replace('{{our_title_place_holder}}', iscustomer ? `Thank you ${htmlData.name.split(" ")[0]} for contacting me! I will get back to you soon.💯` : `${htmlData.name.split(" ")[0]} has contacted you! 🕺🏽`)
                        .replace('{{email_body_holder}}', htmlData.message);
        }

        if (req.method == "POST") {
                const { name, email, message } = req.body.contact

                if (!name || !email || !message) {
                        return res.status(400).send("Incomplete form!");
                }

                const user_opts = {
                        from: process.env.NEXT_PUBLIC_NODEMAIL_EMAIL,
                        to: email,
                        subject: `Hello ${name}, thank you 😊!`,
                        text: `You(${name}) sent us - ${message}. I will get back to you soon, thank you💯`,
                        html: emailHtml(req.body.contact, true)
                };

                const my_opts = {
                        from: process.env.NEXT_PUBLIC_NODEMAIL_EMAIL,
                        to: process.env.NEXT_PUBLIC_NODEMAIL_EMAIL,
                        subject: `${name} sent you an email 😊!`,
                        text: `${name} sent you - ${message}`,
                        html: emailHtml(req.body.contact, false)
                };


                try {
                        //customer email
                        await transporter.sendMail({ ...user_opts })

                        //my email
                        await transporter.sendMail({ ...my_opts })

                        console.log("Emails sent success")
                        return res.status(201).send("Emails sent");

                } catch (error) {
                        console.log("email failed", error)
                        return res.status(400).send(error.message);
                }
        }

        return res.status(400).send("Bad request!");
}));

export default ogo_portfolioRouter;
