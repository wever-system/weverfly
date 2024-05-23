import "./StatusBar.css";
import CloseButton from "./CloseButton";
import MinimizeButton from "./MinimizeButton";
import { Box, Slider, Typography } from "@mui/material";
import { ipcRenderer } from "electron";

const StatusBar = () => {
  const handleOpacity = (v: number) => {
    ipcRenderer.send("change-opacity", v);
  };
  return (
    <div className="status-bar">
      <Box display={"flex"} alignItems={"center"}>
        <Slider
          sx={{
            opacity: 0.5,
            width: 50,
            height: 4,
            position: "fixed",
            top: 10,
            right: 70,
            mt: -1,
            "-webkit-app-region": "no-drag",
          }}
          aria-label="Temperature"
          defaultValue={1}
          valueLabelDisplay="auto"
          shiftStep={0.1}
          step={0.1}
          marks
          min={0.1}
          max={1.0}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleOpacity(e.target.value);
          }}
        />
        <MinimizeButton />
        <CloseButton />
        <Box
          sx={{
            width: 600,
            border: 0.5,
            borderColor: "#555",
            backgroundColor: "rgb(50, 50, 51)",
            py: 0.3,
            borderRadius: 2,
          }}
        >
          <Typography variant={"body2"}>Weverfly</Typography>
        </Box>
      </Box>
    </div>
  );
};

export default StatusBar;
