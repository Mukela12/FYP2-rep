const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const { authenticator } = require('otplib');

admin.initializeApp();

exports.sendOtpEmail = functions.firestore
    .document('user_secrets/{userId}')
    .onCreate(async (snap, context) => {
        const userId = context.params.userId;
        const userSecret = snap.data().secret;

        // Generate TOTP
        const otp = authenticator.generate(userSecret);

        // Fetch user's email from your user collection
        const userRef = admin.firestore().collection('users').doc(userId);
        const userDoc = await userRef.get();
        const userEmail = userDoc.data()?.email;

        // Configure nodemailer or similar service
        const transporter = nodemailer.createTransport({/* ... */});

        const mailOptions = {
            from: 'edudeals.savingspot@gmail.com',
            to: userEmail,
            subject: 'Your Verification Code',
            text: `Your verification code is: ${otp}. It will expire in 30 seconds.`
        };

        return transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
        });
    });
