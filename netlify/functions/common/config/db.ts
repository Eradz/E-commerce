import { Sequelize, DataType } from "sequelize";
import { readFileSync } from 'node:fs'
import dotenv from "dotenv"
dotenv.config()
export const sequelize = new Sequelize({
  dialectOptions:{
    ssl:{
      ca: readFileSync('./ca.pem').toString(),
      require:true
    },
  },
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  port: 19629,
  dialect: "postgres",
  database: process.env.POSTGRES_DATABASE, 
  define:{
    freezeTableName:true
  }
})
export const db = async(): Promise<void> =>{
    try {
        await sequelize.authenticate();
        await sequelize.sync()
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}





