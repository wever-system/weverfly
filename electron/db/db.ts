import dotenv from "dotenv";
import mysql from "mysql2";
// import path from "path";

dotenv.config();  

console.log("final NODE_ENV is ", process.env.NODE_ENV, process.env.VITE_DB_HOST, process.env.VITE_DB_DATABASE);

const connection = {
  //database 접속 정보 입력
  host: process.env.VITE_DB_HOST as string,
  user: process.env.VITE_DB_USERNAME as string,
  password: process.env.VITE_DB_PASSWORD as string,
  port: process.env.VITE_DB_PORT as unknown as number,
  database: process.env.VITE_DB_DATABASE as string,
  connectionLimit: 30, // 커넥션수 30개로 설정
};
const dbPool = mysql.createPool(connection);
export default dbPool;
