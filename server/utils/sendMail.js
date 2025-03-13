import dotenv from "dotenv";
import nodemailer from "nodemailer";
import Mustache from "mustache";
import fs from "fs"; 
import path, { dirname } from "path";
import { fileURLToPath } from "url";

dotenv.config();

export const sendMail = async (
  name = "Guest",
  receiverMail = "",
  subject = "No subject",
  resetLink = "",
  templateName="reset-password.html"
) => {
  let transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_EMAIL_APP_PASSWORD,
    },
  });

  // Get the __dirname equivalent in ES modules
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  // Construct the template file path
    const templatePath = path.join(__dirname, "../templates", templateName);
    console.log({templatePath});
    
  
  try {
    // Read the template file
    const template = fs.readFileSync(templatePath, "utf8");

    // Render the email content using Mustache
    const renderedEmail = Mustache.render(template, { name, resetLink });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: receiverMail,
      subject: subject,
      html: renderedEmail,
    };

    // Send the email
    const info = await transport.sendMail(mailOptions);
    return info;
  } catch (err) {
    console.error("Error sending email:", err);
    return err;
  }
};
