import {Response, Request} from "express"
import { AppResponse, setCookies } from "../../common/utils"
import AsyncHandler from "express-async-handler"
import { User } from "../../models"
import bcrypt from "bcryptjs"


export const getAllUsersController = AsyncHandler(async(req: Request, res: Response) =>{
   const users = await User.findAll()
   if( !users || users.length < 1) {
    AppResponse.error(res, "No users found")
    return
   }
    AppResponse.success(res, "Users found", users)
})

export const getUserByIdController = AsyncHandler(async(req: Request, res: Response) =>{
    const {id} = req.params
    const user = await User.findByPk(id)
    if(!user){
        AppResponse.error(res, "User not found")
        return
    }
    AppResponse.success(res, "User found", user)
})

export const updateUserController = AsyncHandler(async(req: Request, res: Response) =>{
    const {id} = req.params
    const updatedUserData : {
        firstname?: string;
        lastname?: string;
        password?: string;
        role?: "user" | "merchant" | "admin";
        address?: string;
        phone_number?: string;
    } = req.body
    if(!id){
        AppResponse.error(res, "Please provide an id")
        return
    }
    if(Object.keys(updatedUserData).includes("email")){
        AppResponse.error(res, "Email address can not be changed")
        return
    }
    if(Object.keys(updatedUserData).includes("password") && updatedUserData.password){
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10)
    }
    const user = await User.findByPk(id)
    const admin = await User.findByPk(req.id)
    if(!user) {
        AppResponse.error(res, "User not found")
        return
    }
    if (Object.keys(updatedUserData).includes("role") && !admin){
        AppResponse.error(res, "Only Admins can update role")
        return
    }
    const finalUser = await User.update(updatedUserData, {where: {id}})
    AppResponse.success(res, "User Updated successfully", finalUser)
})

export const deleteUserController = AsyncHandler(async(req: Request, res: Response) =>{
    const {id} = req.params
    const user = await User.findByPk(id)
    if(!user){
         return AppResponse.error(res, "User not found");
        }
    const finalUser = await User.destroy({where:{id}})
    AppResponse.success(res, "User Deleted successfully", finalUser)
})