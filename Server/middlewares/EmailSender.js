
const nodemailer = require('nodemailer')
require('dotenv').config();
const passwordKey = process.env.PASS_KEY;

function sendWelcomeEmail(id, email, password) {
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
    subject: ' welcome to our website hero',
    html:  `<p><strong>Thank you for signing up!</strong></p>
    <p>Your account has been created successfully, and now you can log in using your credentials:</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Password:</strong> ${password}</p>
    <p>Please do not share your login information with anyone.</p>
    <p>Click <a href="http://localhost:7000/v1/customers/validate/${id}">here</a> to log in to your account.</p>`
};
transporter.sendMail(mailContent, (err, info) => {
    if (err) {
        console.error(err);
    } else {

        console.log('Email sent:', info.response);
    }
})
};




function sendWelcomeEmailForUser(email, userName, password) {
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
        subject: ' welcome to our website ',
        html:  `<p><strong>Thank you for signing up!</strong></p>
        <p>Your account has been created successfully, and now you can login using your credentials:</p>
        <p><strong>Username:</strong> ${userName}</p>
        <p><strong>Password:</strong> ${password}</p>
        <p>Please do not share your login information with anyone.</p>`
        
    };
    transporter.sendMail(mailContent, (err, info) => {
        if (err) {
            console.error(err);
        } else {
    
            console.log('Email sent:', info.response);
        }
    })
    }




    function frogotPassForUser(email, password) {
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
            subject: 'Forget password',
            html:  `<p><strong>Trouble signing in?</p>
            <p>It seems like you forgot your password, Here you are!</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Password:</strong> ${password}</p>
            <p>Please do not share your login information with anyone.</p>`
            
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
    sendWelcomeEmail:sendWelcomeEmail,
    sendWelcomeEmailForUser:sendWelcomeEmailForUser,
    frogotPassForUser:frogotPassForUser
};
