import { Category } from './../../models/categoriesModel';
import {Response, Request} from "express"
import { AppResponse } from "../../common/utils"
import AsyncHandler from "express-async-handler"



export const createCategoryController = AsyncHandler(async(req: Request, res: Response) =>{
   const {name, description}: {name: string, description: string} = req.body
   if(!name){
    return AppResponse.error(res, "Please Enter a valid name for the Category")
   }
   const categoryExists = await Category.findOne({where: {name, description}})
   if(categoryExists){
    return AppResponse.error(res, "Category already Exists")
   }
   const category = await Category.create({description, name})
   if(category) {
    return AppResponse.success(res, "Category created", category)
}
return AppResponse.error(res, "Error creating Category")
  
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