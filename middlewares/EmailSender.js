
const nodemailer = require('nodemailer')
require('dotenv').config();
const passwordKey = process.env.PASS_KEY;
function sendWelcomeEmailToUser(email, userName, password) {
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth:{
        user: 'balstore.info@gmail.com',
        pass: passwordKey
    }
});
const mailContent = {
    from: 'balstore.info@gmail.com',
    to: email,
    subject: 'Welcome to our website hero',
    text: 
        `Thank you for signing up, your account has been created successfully and now you can login into your account using your credentials
        your userName: ${userName}
        your Password: ${password}
        Don't share your infos with no one.`      
};
transporter.sendMail(mailContent, (err, info) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Email sent:', info.response);
    }
})
}
module.exports = {
    sendWelcomeEmailToUser,
    // sendWelcomeEmail
};