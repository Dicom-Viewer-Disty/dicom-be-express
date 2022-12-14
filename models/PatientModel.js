import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Patients = db.define("patients", {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  medicalRecordNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: [3, 100],
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, 100],
    },
  },
  birthDate: {
    type: DataTypes.DATE,
    defaultValue: null,
    allowNull: true,
    validate: {
      notEmpty: true,
    },
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  profileImage: {
    type: DataTypes.STRING,
    defaultValue: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  phoneNumber: {
    type: DataTypes.STRING,
    defaultValue: null,
    allowNull: true,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: DataTypes.STRING,
    defaultValue: null,
    allowNull: true,
    validate: {
      notEmpty: true,
    },
  },
  address: {
    type: DataTypes.STRING,
    defaultValue: null,
    allowNull: true,
    validate: {
      notEmpty: true,
    },
  },
  disease: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
    validate: {
      notEmpty: true,
    },
  },
  note: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
    validate: {
      notEmpty: true,
    },
  },
  // dicomFile: {
  //   type: DataTypes.STRING,
  //   allowNull: true,
  //   defaultValue: null,
  //   validate: {
  //     notEmpty: true,
  //   },
  // },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

Users.hasMany(Patients);
Patients.belongsTo(Users, { foreignKey: "userId" });
export default Patients;
