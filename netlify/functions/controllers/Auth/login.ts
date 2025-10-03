import {Response, Request} from "express"
import { AppResponse, setCookies } from "../../common/utils"
import AsyncHandler from "express-async-handler"
import { User } from "../../models"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const loginController = AsyncHandler(async(req: Request, res: Response) =>{
   const { password, email} = req.body
   if(!password || !email){
      return AppResponse.error(res, "Please fill all required fields")
   }
   // Perform login logic here 
   const user = await User.findOne({where:{email}})
   if(!user){
      AppResponse.error(res, "Invalid Email or Password")
      return
   }
   if(user?.googleId){
      return AppResponse.error(res, "User can only Sign in with Google")

   }
   if(user !== null && user.password && await bcrypt.compare(password, user.password)){
        const accessToken = await jwt.sign({userId: user.id, date: Date.now()}, process.env.JWT_SECRET || "", {expiresIn: "7d"})
        setCookies(res, "access_token", accessToken)
      return AppResponse.success(res, `Login successful, Welcome ${user.firstname}`, null)
   }else{
       return AppResponse.error(res, "Invalid Email or Password")
   }
})