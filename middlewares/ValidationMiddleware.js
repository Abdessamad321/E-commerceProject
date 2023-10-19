const express = require("express");

function validateInput(firstName, lastName, email, user_name, password) {
    const errors = [];
    if (!firstName || !firstName.match(/^[A-Za-z ]+$/)) {
        errors.push("Enter your firstname; there is no name with numbers in it.");
    }
    if (!lastName || !lastName.match(/^[A-Za-z ]+$/)) {
        errors.push("Enter your lastname; there is no name with numbers in it.");
    }
    if (!user_name || !user_name.match(/^[A-Za-z ]+$/)) {
        errors.push("Enter your real name; there is no name with numbers in it.");
    }
    if (
        !email ||
        !email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)
    ) {
        errors.push("Invalid email address.");
    }
    if (!password || password.length < 6) {
        errors.push("Password should be at least 6 characters.");
    }
    return errors;
}

module.exports = validateInput;
