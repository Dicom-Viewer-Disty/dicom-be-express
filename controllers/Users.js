import Users from "../models/UserModel.js";
import argon2 from "argon2";

// get all user
export const getUsers = async (req, res) => {
  try {
    const response = await Users.findAll({
      attributes: ["uuid", "name", "email", "phoneNumber", "gender", "roleId", "createdAt", "updatedAt"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// get user by id
export const getUserById = async (req, res) => {
  try {
    const response = await Users.findOne({
      attributes: ["uuid", "name", "email", "phoneNumber", "gender", "roleId", "createdAt", "updatedAt"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// create user
export const createUser = async (req, res) => {
  const { name, email, phoneNumber, password, confirmPassword, role, gender } = req.body;
  if (password !== confirmPassword) return res.status(400).json({ msg: "password dan confirm password tidak cocok" });
  const hashPassword = await argon2.hash(password);
  try {
    await Users.create({
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      password: hashPassword,
      roleId: role,
      gender: gender,
    });
    res.status(201).json({ msg: "Registration success" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// update user
export const updateUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!user) return res.status(404).json({ msg: "user not found" });
  const { name, email, password, gender, phoneNumber, confirmPassword, role } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }
  if (password !== confirmPassword) return res.status(400).json({ msg: "password and password confirmation doesnt match" });
  try {
    await Users.update(
      {
        name: name,
        email: email,
        password: hashPassword,
        gender: gender,
        phoneNumber: phoneNumber,
        roleId: role,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ msg: "user update success" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// delete user
export const deleteUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!user) return res.status(404).json({ msg: "user not found" });

  try {
    await Users.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ msg: "delete user success" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
