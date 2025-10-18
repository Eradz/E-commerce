import { DataTypes } from "sequelize";
import { sequelize } from "../common/config";
import { InventoryModel } from "../common/types";

export const Category = sequelize.define<InventoryModel>("Category",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: {
        type: DataTypes.NUMBER,
        allowNull: false,
        validate:{
            isAlpha: true
        }
    },
    variantId: {
        type: DataTypes.INTEGER,
        references: {
            model: "ProductVariants",
            key: "id"
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: "Category",
            key: "id"
        }
    },       
})

