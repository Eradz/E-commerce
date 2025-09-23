import { Sequelize, DataType } from "sequelize";

export const sequelize = new Sequelize("postgresql://postgres:351885@localhost:5432/E-commerce",
    {
        define: {
            freezeTableName: true,
          },
    })
export const db = async(): Promise<void> =>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}





