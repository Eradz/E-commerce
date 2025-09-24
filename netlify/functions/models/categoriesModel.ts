import { DataTypes } from "sequelize";
import { sequelize } from "../common/config";
import { CategoryModel } from "../common/types";

export const Category = sequelize.define<CategoryModel>("Category",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isAlpha: true
        }
    },
    parent_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "Category",
            key: "id"
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
        
}, {timestamps: false,})

