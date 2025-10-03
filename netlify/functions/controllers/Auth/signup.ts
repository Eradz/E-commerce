import {Response, Request} from "express"
import { AppResponse } from "../../common/utils"
import AsyncHandler from "express-async-handler"
import { User } from "../../models"
import bcrypt from "bcryptjs"
import { UserType } from "../../common/types"

export const signupController = AsyncHandler(async(req: Request, res: Response) =>{
   const {firstname, lastname, password, email, role, address, phone_number} : UserType = req.body
   if(!firstname || !lastname || !password || !email){
      AppResponse.error(res, "Please fill all required fields")
   }
   // Perform signup logic here 
   const user = await User.findOne({where:{email}})
   if(user){
      AppResponse.error(res, "User already exists")
   }
   const hashedPassword = await bcrypt.hash(password, 10)
   const newUser = await User.create({firstname, lastname, password: hashedPassword, email, role, address, phone_number })
   newUser.save()
   AppResponse.success(res, "Signup successful", null)
})