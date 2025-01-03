const express = require("express");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

// Email sending endpoint
app.post("/send-email", async (req, res) => {
  const { recipientEmail, studentName } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // Or any other email service
      auth: {
        user: "your-email@gmail.com",
        pass: "your-email-password", // Use app password for Gmail
      },
    });

    const attachmentPath = path.join(__dirname, "offerletter.jpg");

    const mailOptions = {
      from: "your-email@gmail.com",
      to: recipientEmail,
      subject: `Internship Offer Letter for ${studentName}`,
      text: `Dear ${studentName},\n\nWe are pleased to offer you an internship position. Please find the attached offer letter.\n\nBest regards,\nYour Company`,
      attachments: [
        {
          filename: "offerletter.jpg",
          path: attachmentPath,
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email");
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
