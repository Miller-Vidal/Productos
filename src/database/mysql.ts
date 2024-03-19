import mysql from "mysql2/promise";
import { Signale } from "signale";

const signale = new Signale();


const config = {
    host: 'database-2.cfyii6aowla3.us-east-1.rds.amazonaws.com',
    port: 3306,
    user: 'admin',
    database: 'vaquito',
    password: 'admin123',
    waitForConnections: true,
    connectionLimit: 10,
};


// Crear el pool de conexiones
const pool = mysql.createPool(config);

export async function query(sql: string, params?: any[]) {
    try {
        const conn = await pool.getConnection();
        signale.success("Conexión exitosa a la BD");
        const result = await conn.execute(sql, params);
        conn.release();
        return result;
    } catch (error) {
        console.log(process.env.DB_HOST); 
        signale.error(error);
        return null;
    }
}