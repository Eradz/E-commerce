import {Response, Request} from "express"
import { AppResponse, setCookies } from "../../common/utils"
import AsyncHandler from "express-async-handler"
import bcrypt from "bcryptjs"
import { Category } from "../../models"
import { where } from "sequelize"


export const createCategoryController = AsyncHandler(async(req: Request, res: Response) =>{
   const {name, description}: {name: string, description: string} = req.body
   if(!name){
    AppResponse.error(res, "Please Enter a valid name for the Category")
   }
   const category = await Category.create({description, name})
   if(category) {
    AppResponse.success(res, "Category created", category)
}
    AppResponse.error(res, "Error creating Category")
    return
})


export const getCategoryController = AsyncHandler(async(req: Request, res: Response) =>{
    const category = await Category.findAll()
    if(category) {
        return AppResponse.success(res, "Categories Found", category)
    }
    return AppResponse.error(res, "Couldnt find catergories")
 })
 
export const updateCategoryController = AsyncHandler(async(req: Request, res: Response) =>{
    const {id}  = req.params
   const {name, description}: {name: string, description: string} = req.body
 // Validate id
 if (!id || isNaN(Number(id))) {
    return AppResponse.error(res, 'Invalid category ID provided');
  }

  // Validate name and description
  if (!name || !description) {
    return AppResponse.error(res, 'Please provide both name and description to update');
  }

  // Convert id to integer
  const categoryId = parseInt(id, 10);

  // Update category
  const [affectedCount] = await Category.update(
    { name, description },
    { where: { id: categoryId } }
  );

  if (affectedCount > 0) {
    const updatedCategory = await Category.findByPk(categoryId);
    return AppResponse.success(res, 'Category updated successfully', updatedCategory);
  }

  return AppResponse.error(res, 'Category not found or error updating category');
});


// export const getUserByIdController = AsyncHandler(async(req: Request, res: Response) =>{
//     const {id} = req.params
//     const user = await User.findById(id).select("_id firstname lastname email role")
//     if(!user){
//         AppResponse.error(res, "User not found")
//         return
//     }
//     AppResponse.success(res, "User found", user)
// })

// export const updateUserController = AsyncHandler(async(req: Request, res: Response) =>{
//     const {id} = req.params
//     const updatedUserData = req.body
//     if(!id){
//         AppResponse.error(res, "Please provide an id")
//         return
//     }
//     if(Object.keys(updatedUserData).includes("email")){
//         AppResponse.error(res, "Email address can not be changed")
//         return
//     }
//     if(Object.keys(updatedUserData).includes("password")){
//         updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10)
//     }
//     const user = await User.findById(id)
//     const admin = await User.findById(req.id)
//     if(!user) {
//         AppResponse.error(res, "User not found")
//         return
//     }
//     if (Object.keys(updatedUserData).includes("role") && !admin){
//         AppResponse.error(res, "Only Admins can update role")
//         return
//     }
//     const finalUser = await User.findByIdAndUpdate(id, updatedUserData, {new: true})
//     AppResponse.success(res, "User Updated successfully", finalUser)
// })

// export const deleteUserController = AsyncHandler(async(req: Request, res: Response) =>{
//     const {id} = req.params
//     const user = await User.findById(id)
//     if(!user){
//          return AppResponse.error(res, "User not found");
//         }
//     const finalUser = await User.findByIdAndDelete(id)
//     AppResponse.success(res, "User Deleted successfully", finalUser)
// })