const config = require("config")
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../models");

console.log("prod",config.get("googleAuthId"));

passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser(async(id,done)=>{
    const findUser = await User.findById(id);
    done(null,findUser);
})

passport.use(new GoogleStrategy({
    clientID:config.get("googleAuthId"),
    clientSecret:config.get("googleAuthSecret"),
    callbackURL:"/auth/google/redirect"
},
async(accessToken, refreshToken, profile, done)=>{
    console.log("Passport callback ran");
    const findUser = await User.find({googleId:profile._json.sub});
    if(!findUser.length){
         const newUser = await User.create({
              username:profile._json.family_name,
              googleId:profile._json.sub,
              thumbnail:profile._json.picture
         });
         done(null,newUser);
         console.log("new User",newUser);    
    }else{
         console.log("findUser",findUser);
         done(null,findUser[0]);
    }
   }
));
