const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json());

// POST route for contact form submission
app.post("/send-message", (req, res) => {
  const { name, email, message } = req.body;

  // Nodemailer transport setup (using Gmail SMTP)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "zeewar095@gmail.com", // Your email address
      pass: "irrb xikw zkrr kgsv", // App-specific password (not your regular Gmail password)
    },
  });

  // Email content
  const mailOptions = {
    from: email, // User's email
    to: "zeewar095@gmail.com", // Your email to receive the message
    subject: `New Contact Message from ${name}`,
    text: `You received a new message from ${name} (${email}):\n\n${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ message: "Failed to send message" });
    }
    console.log("Email sent:", info.response);
    res.status(200).json({ message: "Message sent successfully!" });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

