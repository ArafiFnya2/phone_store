import { pool } from "../config/db.js";
import { ResponseError } from "../errors/responseError.js";
import { createUserSchema } from "../validation/userValidation.js";
import validate from "../validation/validate.js";

export const createUser = async (user) => {
  const validated = createUserSchema.safeParse(user);

  if (!validated.success) {
    throw new ResponseError(400, "Invalid user data");
  }

  const { fullname, username, email, password, role = "user", address = null, phone_number = null, age = null } = validated.data;

  const [insertResult] = await pool.query(
    `INSERT INTO users (fullname, username, email, password, role, address, phone_number, age)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [fullname, username, email, password, role, address, phone_number, age]
  );

  const insertedId = insertResult.insertId;
  return await getUserById(insertedId);
};

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

export const updateUser = async (id, user) => {
  const validated = validate(updateUserHandler, user); // Corrected to use 'user'

  const {
    fullname,
    username,
    email,
    role,
    address,
    phone_number,
    age,
  } = validated;

  const [result] = await pool.query(
    "UPDATE users SET fullname=?, username=?, email=?, role=?, address=?, phone_number=?, age=? WHERE id=?",
    [fullname, username, email, role, address, phone_number, age, id]
  );

  if (result.affectedRows === 0) {
    throw new ResponseError(404, "User not found");
  }

  return await getUserById(id);
};

export const deleteUser = async (id) => {
  const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);

  if (result.affectedRows === 0) {
    throw new ResponseError(404, "User not found");
  }

  return { message: "User deleted" };
};