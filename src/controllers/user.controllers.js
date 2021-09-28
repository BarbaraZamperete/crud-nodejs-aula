const usersCtrl = {}

const passport = require('passport');
const User = require('../models/Users');

usersCtrl.renderSingUpForm = (req,res) => {
    res.render('users/signup');
};

usersCtrl.signup = async (req,res) => {
    // res.send('signup');
    const errors = [];
    const { name, email, password, confirm_password } = req.body;
    if (password != confirm_password) {
        errors.push({text: 'Passwords do not match'});
    };
    if (password.length < 4){
        errors.push({text: 'Password must be least 4 characteres'});
    }
    if(errors.length != 0){
        res.render("users/signup", {errors, name, email});
    }else{
        const emailUser = await User.findOne({email: email});
        if (emailUser){
            req.flash('error_msg', 'The e-mail already exist');
            res.redirect('/users/signup');
        }else{
            const newUser = new User({name, email, password});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'You are registered');
            res.redirect('/users/login');
        }
        
    }
};

usersCtrl.renderLoginForm = (req,res) => {
    res.render('users/login');
};

// usersCtrl.login = (req, res) => {
//     res.send('login');
// };

usersCtrl.login = passport.authenticate('local', {
    failureRedirect: '/users/login',
    successRedirect: '/notes',
    failureFlash: true
}); 


usersCtrl.logout = (req, res) => {
    // res.render('users/logout');
    req.logout();
    req.flash('success_msg', 'You are logged out now');
    res.redirect('/users/login');
};

module.exports = usersCtrl;