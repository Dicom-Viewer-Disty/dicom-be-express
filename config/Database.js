import { Sequelize } from "sequelize";

const db = new Sequelize("dicom_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
