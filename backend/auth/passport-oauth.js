const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(new GoogleStrategy({
    clientID:"",
    clientSecret:"",
    callbackURL:"/auth/google/callback"
},
(accessToken, refreshToken, profile, done)=>{

    return done(null,user);
}))
