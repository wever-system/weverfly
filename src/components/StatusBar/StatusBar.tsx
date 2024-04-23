import "./StatusBar.css";
import CloseButton from "./CloseButton";
import MinimizeButton from "./MinimizeButton";
import { Box, Typography } from "@mui/material";

const StatusBar = () => {
  return (
    <div className="status-bar">
      <Box display={"flex"} alignItems={"center"}>
        <MinimizeButton />
        <CloseButton />
            <Box
              sx={{
                width: 600,
                border: 0.5,
                borderColor: "#555",
                backgroundColor: "rgb(50, 50, 51)",
                py:0.3,
                borderRadius: 2
              }}
            >
              <Typography variant={"body2"}>Weverfly</Typography>
            </Box>
      </Box>
    </div>
  );
};

export default StatusBar;
