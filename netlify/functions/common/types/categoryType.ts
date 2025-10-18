import { CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";

export interface CategoryModel extends Model<InferAttributes<CategoryModel>, InferCreationAttributes<CategoryModel>> {
    id: CreationOptional<number>;
    name: string;
    parent_id: ForeignKey<number> | null;
    description: string;
  }
  export interface ProductModel extends Model<InferAttributes<ProductModel>, InferCreationAttributes<ProductModel>> {
    id: CreationOptional<number>;
    name: string;
    description: string;
    base_price: string;
    categoryId: ForeignKey<number>;
    brandId: ForeignKey<number>;
    imageUrl: string;
    is_active: boolean;
  }
  export interface ProductAttributeModel extends Model<InferAttributes<ProductAttributeModel>, InferCreationAttributes<ProductAttributeModel>> {
      id: CreationOptional<number>;
      name: string;
      productId: ForeignKey<number>;
      value: string;
    }
  export interface ProductVariantsModel extends Model<InferAttributes<ProductVariantsModel>, InferCreationAttributes<ProductVariantsModel>> {
      id: CreationOptional<number>;
      variant_name: string;
      productId: ForeignKey<number>;
      additional_price: ForeignKey<number>;
      quantity: string;
    }
  export interface InventoryModel extends Model<InferAttributes<InventoryModel>, InferCreationAttributes<InventoryModel>> {
      id: CreationOptional<number>;
      variant_id: ForeignKey<number>;
      productId: ForeignKey<number>;
      quantity: string;
    }