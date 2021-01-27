const path = require('path');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const config = require('./config/dababase');
const bodyParser = require('body-parser');

const session = require('express-session')
const passport = require('passport');
const expressValidator = require('express-validator');
const fileUpload = require('express-fileupload');
const MongoStore = require('connect-mongo')(session);

//Passport config
require('./config/passport')(passport);


//conect to db
mongoose.connect(config.database, {useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to mongoDB');
});

const app = express();

//define paths for Express config
const publicDirectoryPath = path.join(__dirname ,'./public');

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Setup Public directory
app.use(express.static(publicDirectoryPath));

//Express fileupload middleware
app.use(fileUpload());

//Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

//Express Session middeware
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  cookie: {maxAge:1 * 60 * 1000}
}));

//Global variables
app.use(require('connect-flash')());

app.use(function (req, res, next) {
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});



//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  next();
});

//Routes
app.use('/', require('./routes/index'));
app.use('/', require('./routes/users'));
app.use('/about', require('./routes/about'));
app.use('/shop', require('./routes/shop'));
app.use('/shop-detail', require('./routes/shop-detail'));
app.use('/cart', require('./routes/cart'));
app.use('/checkout', require('./routes/checkout'));
app.use('/my-account', require('./routes/my-account'));
app.use('/wishlist', require('./routes/wishlist'));
app.use('/gallery', require('./routes/gallery'));
app.use('/contact-us', require('./routes/contact-us'));
app.use('/', require('./routes/add-to-cart'));

//add products
app.use('/admin/products', require('./routes/admin_products'));






const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
