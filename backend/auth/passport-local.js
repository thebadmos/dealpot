const passport = require("passport"),
LocalStrategy = require();

passport.use(new LocalStrategy((username,password,done)=>{
    return done(null, user);
}))

passport.serializeUser((user, done)=>done(null, user.id));
passport.deserializeUser(async (id, done)=>{
    //check if user exists in the databse
    return done(null,user)
})