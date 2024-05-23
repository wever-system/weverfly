// import { ipcRenderer } from "electron";
import dotenv from "dotenv";
import { Box, Grid } from "@mui/material";

import { SideBar } from "./sidebar/sidebar";

import { useEffect } from "react";
import useActiveTabStore from "../../store";
// import React from "react";
import Clipboard from "./pages/clipboard";
import Chat from "./pages/chat";

dotenv.config();

const Body = () => {
  const { activeTab } = useActiveTabStore();
  useEffect(() => {}, []);
  return (
    <Box sx={{}}>
      <Grid
        container
        height={"90vh"}
        display={"flex"}
        justifyContent={"space-between"}
      >
        <Grid
          item
          width={50}
          bgcolor={"#161616"}
          borderRight={"0.2px solid #363636"}
        >
          <SideBar />
        </Grid>

        <Grid item flexGrow={2} bgcolor={"#1c1c1c"}>
          {activeTab === "clipboard" && <Clipboard />}
          {activeTab === "chat" && <Chat />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Body;
