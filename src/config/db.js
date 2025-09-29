import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "phone_store_db",
});

export const testConnection = async () => {
    const connection = await pool.getConnection();

    try {
        const connection = await pool.getConnection();
        console.log("database connected successfully")
    } catch (error) {
        console.log(error);
        throw error;
    }
}