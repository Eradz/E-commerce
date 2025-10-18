import { DataTypes } from "sequelize";
import { sequelize } from "../common/config";
import { ProductVariantsModel } from "../common/types";

export const ProductAttribute = sequelize.define<ProductVariantsModel>("Brand",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    variant_name: {
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
    additional_price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
})

