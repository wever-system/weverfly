// import { ipcRenderer } from "electron";
import dotenv from "dotenv";
import {
  Box,
  Grid
} from "@mui/material";


import { SideBar } from "./sidebar/sidebar";

import { useEffect } from "react";
import useActiveTabStore from "../../store";
// import React from "react";
import Clipboard from "./pages/clipboard";

dotenv.config();

const Body = () => {
  const { activeTab } = useActiveTabStore();
  useEffect(() => {
    console.log("hhhello")
  }, [])
  return (
    <Box sx={{ minWidth: 800 }}>
      <Grid container height={"100vh"}>
        <Grid
          item
          width={50}
          bgcolor={"#161616"}
          borderRight={"0.2px solid #363636"}
        >
         <SideBar/> 
        </Grid>
       
        <Grid item>
          {activeTab === "gpt" && <> gpttt         </>}
          {activeTab === "clipboard" && <><Clipboard/>dddddddd</>}
        </Grid>

      </Grid>
    </Box>
  );
};

export default Body;
