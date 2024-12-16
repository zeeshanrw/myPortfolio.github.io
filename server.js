const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));  // Serve static files from the 'public' directory

// Route to handle form submission
app.post('/send_mail', (req, res) => {
  const { email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'zeeshan.rafaqat@gmail.com',
      pass: 'fuckthisshit@',
    },
  });

  const mailOptions = {
    from: email,
    to: 'zeeshan.rafaqat@gmail.com',
    subject: 'New Contact Form Submission',
    text: `Email: ${email}\n\nMessage:\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error); // Log the detailed error message
      return res.status(500).send('There was an error sending your message. Please try again later.');
    }
    res.send('Thank you for contacting me. I will get back to you shortly.');
  });
});

// Serve index.html at the root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
