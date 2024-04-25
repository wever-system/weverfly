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
