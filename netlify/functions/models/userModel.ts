import { DataTypes } from "sequelize";
import { sequelize } from "../common/config";
import { UserType } from "../common/types";

export const User = sequelize.define<UserType>("User",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    googleId:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isEmail: true
        }
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isAlpha: true
        }
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isAlpha: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            isAlpha: true
        }
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isAlpha: true
        }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            isAlpha: true
        }
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            isAlpha: true
        }
    }   
}, {timestamps: true})

