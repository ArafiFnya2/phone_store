import { pool } from "../config/db.js";
import { ResponseError } from "../errors/responseError.js";

export const getAllUser = async () => {
  const [users] = await pool.query(
    "SELECT id, fullname, username, email, role, address, phone_number, age FROM users"
  );
  return users;
};

export const getUserById = async (id) => { 
  const [users] = await pool.query(
    "SELECT id, fullname, username, email, role, address, phone_number, age FROM users WHERE id = ?",
    [id]
  );

  if (users.length === 0) {
    throw new ResponseError(404, "User not found");
  }

  return users[0];
};

export const createUser = async (user) => {
  const {
    fullname,
    username,
    email,
    role = "user",
    address = null,
    phone_number = null,
    age = null,
  } = user;

  const [result] = await pool.query(
    `INSERT INTO users (fullname, username, email, role, address, phone_number, age)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [fullname, username, email, role, address, phone_number, age]
  );

  const insertedId = result.insertId;
  return await getUserById(insertedId); 
};