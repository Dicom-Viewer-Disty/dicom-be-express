import Users from "../models/UserModel.js";
import argon2 from "argon2";

// get user
export const getUsers = async (req, res) => {
  try {
    const response = await Users.findAll({
      attributes: ["uuid", "name", "email", "roleId"],
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
      attributes: ["uuid", "name", "email", "roleId"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// create user // done
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
    res.status(201).json({ msg: "Register berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!user) return res.status(404).json({ msg: "user tidak ditemukan" });
  const { name, email, password, confirmPassword, role } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }
  if (password !== confirmPassword) return res.status(400).json({ msg: "password dan confirm password tidak cocok" });
  try {
    await Users.update(
      {
        name: name,
        email: email,
        password: hashPassword,
        roleId: role,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ msg: "user update berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!user) return res.status(404).json({ msg: "user tidak ditemukan" });

  try {
    await Users.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ msg: "user delete berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
