import { CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";

export interface CategoryModel extends Model<InferAttributes<CategoryModel>, InferCreationAttributes<CategoryModel>> {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    id: CreationOptional<number>;
    name: string;
    parent_id: ForeignKey<number> | null;
    description: string;
  }