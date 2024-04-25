// config.ts 별도 구축
// sample:

// console.log("final NODE_ENV is ", process.env.NODE_ENV, process.env.VITE_DB_HOST, process.env.VITE_DB_DATABASE);

// const connection = {
//   //database 접속 정보 입력
//   host: "dev.ct0wc4km2hl0.ap-northeast-2.rds.amazonaws.com",
//   user: "develop",
//   password: "Wlghks0326",
//   port: 3306,
//   database: "weverfly",
//   connectionLimit: 30, // 커넥션수 30개로 설정
// };
// const dbPool = mysql.createPool(connection);
// export default dbPool;


import db from "./db";
import { SqlReturnProps } from "./type";

const sqlExcute = (sql: string, params?: any): Promise<SqlReturnProps> => {
  return new Promise<SqlReturnProps>((resolve, reject) => {
    try {
      db.getConnection((err, connection) => {
        if (err) {
          console.log(err);
          const errorResponse: SqlReturnProps = {
            result: false,
            // error: err,
            data: null,
          };
          reject(errorResponse);
          return errorResponse;
        }

        const s = connection.query(sql, params, (err, result) => {
          if (err) {
            console.log(`
            ========================================================================================
            ${err.code}\n
            ========================================================================================`);
            const errorResponse: SqlReturnProps = {
              result: false,
              // error: err,
              data: null,
            };
            reject(errorResponse);

            // return errorResponse;
          }
          const successResponse: SqlReturnProps = {
            result: true,
            data: result,
          };
          resolve(successResponse);
          connection.release();

          return;
        });
        console.log(s.sql);
      });
    } catch (e) {
      console.log(e);
      const errorResponse: SqlReturnProps = {
        result: false,
        error: e,
        data: null,
      };
      reject(errorResponse);

      return;
    }
  });
};

export default sqlExcute;
