import { User } from '../../models';
import passport from "passport"
import {Strategy as GoogleStrategy} from 'passport-google-oauth2' 
import dotenv from 'dotenv'
dotenv.config()

passport.use(new GoogleStrategy({
    clientID :     process.env.GOOGLE_CLIENT_ID ||  " " ,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || " ",
    callbackURL: process.env.NODE_ENV === 'development' ? "http://localhost:5000/api/v1/auth/google/callback" : `${process.env.BACKEND_URL}/api/v1/auth/google/callback`
  },
  async function verify(accessToken: string, refreshToken: string, profile: any, done: any) {
        const {id, family_name, email, given_name }= profile
        const existingUseremail = await User.findOne({where:{email}})
        if(existingUseremail){
         return  done(null, existingUseremail)
        } else{
          const user = await User.create({googleId:id, firstname: given_name, lastname: family_name, email, role: "user"})
          return done(null, user)
        }
  }
));
