const express = require('express');
const session = require('express-session')
const hbs = require('hbs')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
// const passport = require('./passport/setup');
const cors = require('cors')

function setupExpressApp(app) {
    app.set('view engine', 'hbs')
    app.use(express.static('public'))
    app.use(express.urlencoded({ extended: false }))

    app.use(cors())
    
    app.use(cookieParser("secret"))
    app.use(session({
        'cookie': {
            maxAge: 60000
        }
    }))
    app.use(flash())

    app.use(function (req, res, next) {
        res.locals.success_messages = req.flash('success_messages');
        res.locals.error_messages = req.flash('error_messages');
        next();
    })

    // app.use(passport.initialize());
    // app.use(passport.session())

}

module.exports = { setupExpressApp };