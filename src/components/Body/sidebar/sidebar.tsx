import { Grid } from "@mui/material";
import FileIcon from "../../../assets/files.svg";
import SearchIcon from "../../../assets/search.svg";
import GitIcon from "../../../assets/source-control.svg";
import TerminalIcon from "../../../assets/terminal.svg";
import useActiveTabStore from "../../../store";

export const SideBar = () => {
const { setActiveTab } = useActiveTabStore();
    return (
        <Grid
            container
            direction={"column"}
            sx={{ mt: 0.5 }}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            spacing={2}
          >
            <Grid item sx={{ cursor: "pointer" }}>
              <img src={FileIcon} onClick={() => setActiveTab("clipboard")}/>
            </Grid>

            <Grid item sx={{ cursor: "pointer" }} >
              <img src={SearchIcon} onClick={() => setActiveTab("gpt")}/>
            </Grid>

            <Grid item sx={{ cursor: "pointer" }}>
              <img src={GitIcon} onClick={() => setActiveTab("git")}/>
            </Grid>

            <Grid item sx={{ cursor: "pointer" }}>
              <img src={TerminalIcon} onClick={() => setActiveTab("terminal")}/>
            </Grid>
          </Grid>
    )
}