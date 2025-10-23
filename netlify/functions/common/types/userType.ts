import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";

export interface UserType extends Model<InferAttributes<UserType>, InferCreationAttributes<UserType>> {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    id: CreationOptional<number>;
    googleId: string | null;
    email: string;
    firstname: string;
    lastname: string;
    password: string | null;
    role: "user" | "merchant" | "admin";
    address: string | null;
    phone_number: string | null;
    // timestamp: {
    //     createdAt: Date,
    //     updatedAt: Date,
    // }
  }