import { DataTypes } from "sequelize";
import { sequelize } from "../common/config";
import { ProductAttributeModel } from "../common/types";

export const ProductAttribute = sequelize.define<ProductAttributeModel>("Brand",{
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
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Product",
            key: "id"
        }
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {timestamps: true})

