// import { ipcRenderer } from "electron";
import dotenv from "dotenv";
import {
  Box,
  Grid
} from "@mui/material";


import { SideBar } from "./sidebar/sidebar";

import { useEffect } from "react";
import useActiveTabStore from "../../store";

dotenv.config();

const Body = () => {
  const { activeTab } = useActiveTabStore();
  useEffect(() => {
    // getGpt("What is the capital of Korea?")
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
          {activeTab === "gpt" && <>          </>}
        </Grid>

      </Grid>
    </Box>
  );
};

export default Body;
