import { DataTypes } from "sequelize";
import { sequelize } from "../common/config";
import { BrandModel } from "../common/types";

export const Brand = sequelize.define<BrandModel>("Brand",{
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
    }
})

