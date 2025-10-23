import express from "express"
import { signupController, loginController, sessionController } from "../controllers/Auth"
import passport from "passport"
import dotenv from "dotenv"
dotenv.config()

const router = express.Router()

router.post('/signup', signupController)
router.post('/login', loginController)
router.get('/session', sessionController)
router.get("/google", passport.authenticate('google', { scope:[ 'email', 'profile' ] }))
router.get('/google/callback', 
    passport.authenticate('google', {
        failureRedirect: '/api/login'
      }), async(req,res)=>{    
        res.redirect(process.env.NODE_ENV === 'development' ? 'http://localhost:3000/exam' : `${process.env.FRONTEND_URL}/exam` )
      })



export {router as authRouter}