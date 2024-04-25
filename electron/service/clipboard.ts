import sqlExcute from "../db/sqlExcute";

export const getData = async (mac_address: string) => {
    const data = await sqlExcute("SELECT * FROM clipboard where mac_address = ?;", [mac_address]);
    return data.data
  }
  
export const updateClipboard = async (text: string, mac_address: string) => {
    const data = await sqlExcute("INSERT INTO clipboard (text, mac_address) VALUES (?, ?);", [text, mac_address]);
    return data.result
  };