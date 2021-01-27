const express = require('express');
const router = express.Router();
//authentification needed for view this page
const {ensureAuthenticated} = require('../config/auth');

router.get('/',ensureAuthenticated, (req, res) =>{
    res.render('checkout.ejs', {
        name: req.user.firstName
    });
})



module.exports = router;