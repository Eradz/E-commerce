import { Sequelize, DataType } from "sequelize";
import { readFileSync } from 'node:fs'
import dotenv from "dotenv"
import { join } from "node:path";
dotenv.config()
// export const sequelize = new Sequelize( process.env.NODE_ENV === "development" ? "postgresql://postgres:351885@localhost:5432/E-commerce" : "postgres://avnadmin:AVNS_KEwRFRgALaIONmh4qzl@tech-commerce-anaguchidiebere-ebf9.j.aivencloud.com:19629/defaultdb?sslmode=require",
//     {
//         define: {
//             freezeTableName: true,
//           },
//     })
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
  /**
   * host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  dialect: process.env.POSTGRES_DIALECT,
  database:process.env.POSTGRES_DATABASE, 
   */
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





