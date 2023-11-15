const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'edudeals.savingspot@gmail.com',
    pass: 'qoyf dtia pqye dpdv'
  }
});

app.post('/send-email', async (req, res) => {
  const { email, otp } = req.body;
  const mailOptions = {
    from: 'edudeals.savingspot@gmail.com',
    to: email,
    subject: 'Your OTP',
    text: `Your OTP is: ${otp}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
