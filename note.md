user

uuid
name
email
password
role

StrNumber
name
birthDate
gender
profileImage
phoneNumber
email
address
specialization
practicePlace
note

<!-- full user -->

uuid
StrNumber
name
birthDate
gender
profileImage
phoneNumber
email
address
specialization
practicePlace
note
password
role

import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define("users", {
uuid: {
type: DataTypes.STRING,
defaultValue: DataTypes.UUIDV4,
allowNull: false,
validate: {
notEmpty: true,
},
},
strNumber: {
type: DataTypes.STRING,
defaultValue: null,
allowNull: true,
validate: {
notEmpty: true,
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
type: DataTypes.STRING,
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
allowNull: false,
validate: {
notEmpty: true,
},
},
email: {
type: DataTypes.STRING,
allowNull: false,
validate: {
notEmpty: true,
isEmail: true,
},
},
address: {
type: DataTypes.STRING,
allowNull: false,
validate: {
notEmpty: true,
},
},
specialization: {
type: DataTypes.STRING,
allowNull: true,
defaultValue: null,
validate: {
notEmpty: true,
},
},
practicePlace: {
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
password: {
type: DataTypes.STRING,
allowNull: false,
validate: {
notEmpty: true,
},
},
role: {
type: DataTypes.STRING,
allowNull: false,
validate: {
notEmpty: true,
},
},
});

export default Users;
