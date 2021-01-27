const express = require('express');
const expressValidator = require('express-validator');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');



//Users Model
const User = require('../models/user');



//Get register
router.get('/register', (req, res) => {
    res.render('register'); //from views folder .ejs
});

//Register handle
router.post('/register', (req, res) => {
    //console.log(req.body)
    const { firstName, lastName, username, email, password1, password2 } = req.body;
    let errors = [];

    //check required fields
    if (!email || !password1 || !password2) {
        errors.push({ msg: "please fill all required fields!" })
    }

    //check passwords match
    if (password1 !== password2) {
        errors.push({ msg: "passwords do not match!" })
    }

    //check pass length
    if (password1.length < 6) {
        errors.push({ msg: "password should be at least 6 characters" })
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            firstName,
            lastName,
            username,
            email,
            password1,
            password2

        })
    } else {
        // validation passed
        User.findOne({email: email})
        .then(user => {
            if(user){
                //user exists
                errors.push({msg: 'Email is already registered!'})
                res.render('register', {
                    errors,
                    firstName,
                    lastName,
                    username,
                    email,
                    password1,
                    password2
        
                })
            }else{
                const newUser = new User({
                    firstName,
                    lastName,
                    username,
                    email,
                    password1
                });
                //Hash password
                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password1, salt, (err, hash)=>{
                    //if(err) throw err;
                    //set password to hashed
                    newUser.password1 = hash;
                    //save user
                    newUser.save()
                    .then(user => {
                        req.flash('success_msg', 'You are now registered!');
                        
                        res.redirect('/register')
                    })
                    .catch(err => console.log(err));
                }));
            }
        });

    }


});

/*------------------------------------------------------------*/

//Get login
router.get('/login', (req, res) => {
    if(res.locals.user) res.redirect('/');
    res.render('login'); //from views folder .ejs
});

//Login Handle
router.post('/login',(req, res, next) => {
    passport.authenticate('local',{
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
})

//Logout Handle
router.get('/logout', (req, res) => {
    req.logOut();
    req.flash('success_msg', 'you are logged out!');
    res.redirect('/login');
})

module.exports = router;