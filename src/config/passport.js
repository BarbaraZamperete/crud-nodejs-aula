const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/Users');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done ) => {
    const user = await User.findOne({email});
    if (!user){
        return done(null, false, {message: 'Usuario não encontrado.'});
    }else {
        const match = await user.matchPassoword(password);
        if(match){
            return done(null, user);
        }else{
            return done(null, false, {message: 'Senha incorreta.'})
        }
    }
}));
//guardar a sessão (dados do usuario) no servidor
passport.serializeUser((user, done)=>{
    done(null, user.id);
})

//quando esta logado verifica se tem autorização
passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user) => {
        done(err, user);
    })
});