import { DataTypes } from "sequelize";
import { sequelize } from "../common/config";
import { ProductModel } from "../common/types";

export const Product = sequelize.define<ProductModel>("Brand",{
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
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isAlpha: true
        }
    },
    base_price: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isAlpha: true
        }
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Category",
            key: "id"
        }
    },
    brandId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Brand",
            key: "id"
        }
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isAlpha: true
        }
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
}, {timestamps: true})

