import { Sequelize, DataType } from "sequelize";
import { readFileSync } from 'node:fs'
import { join } from "node:path";
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
  host: "tech-commerce-anaguchidiebere-ebf9.j.aivencloud.com",
  username: "avnadmin",
  password: "AVNS_KEwRFRgALaIONmh4qzl",
  port: 19629,
  dialect: "postgres",
  database:"defaultdb", 
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





