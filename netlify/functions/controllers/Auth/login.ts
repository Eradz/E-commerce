import {Response, Request} from "express"
import { AppResponse, setCookies } from "../../common/utils"
import AsyncHandler from "express-async-handler"
import { User } from "../../models"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const loginController = AsyncHandler(async(req: Request, res: Response) =>{
   const { password, email} = req.body
   if(!password || !email){
      AppResponse.error(res, "Please fill all required fields")
   }
   // Perform login logic here 
   const user = await User.findOne({where:{email}})
   if(!user){
      AppResponse.error(res, "Invalid Email or Password")
      return
   }
   if(user?.googleId){
      AppResponse.error(res, "User can only Sign in with Google")

   }
   if(user !== null && await bcrypt.compare(password, user.password)){
        const accessToken = await jwt.sign({userId: user.id, date: Date.now()}, process.env.JWT_SECRET || "", {expiresIn: "7d"})
        setCookies(res, "access_token", accessToken)
      AppResponse.success(res, `Login successful, Welcome ${user.firstname}`, null)
   }else{
       AppResponse.error(res, "Invalid Email or Password")
   }
})