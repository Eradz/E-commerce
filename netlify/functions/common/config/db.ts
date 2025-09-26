import { Sequelize } from "sequelize";
import dotenv from "dotenv"
import pg from "pg"

dotenv.config()
export const sequelize = new Sequelize({
  dialect:"postgres",
  dialectModule: pg,
  dialectOptions:{
    ssl:{
      ca:  process.env.POSTGRES_CA,
      require:true
    },
  },
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT),
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





