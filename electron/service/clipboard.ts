import sqlExcute from "../db/sqlExcute";

export const getData = async (mac_address: string) => {
    const data = await sqlExcute("SELECT idx, text, LEFT(created_at,16) AS created_at FROM clipboard where mac_address = ? order by idx desc limit 10;", [mac_address]);
    return data.data
  }
  
export const updateClipboard = async (text: string, mac_address: string) => {
    const data = await sqlExcute("INSERT INTO clipboard (text, mac_address) VALUES (?, ?);", [text, mac_address]);
    return data.result
  };