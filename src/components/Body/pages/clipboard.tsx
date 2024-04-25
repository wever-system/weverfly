import { Box, Typography } from "@mui/material";
import { ipcRenderer, clipboard as cl } from "electron";
import React, { useEffect } from "react";

interface IClipboard {
  idx: number;
  text: string;
  created_at: string;
}

const Clipboard = () => {
  const [clipboards, setClipboards] = React.useState<IClipboard[]>([]);

  useEffect(() => {
    ipcRenderer.on("clipboard-data", (_, message) => {
      setClipboards(message);
    });
    ipcRenderer.send("clipboard-data");
  }, []);
  const headerCells = [{name:"idx",width:80},{name:"text",width: "50%"},{name:"length",width:150 },{name:"created_at",width:200 }];
  return (
    <Box>
        <Box display={"flex"} justifyContent={"space-around"}>
        {headerCells.map((cell) => {
        return (
            <Box width={cell.width} textAlign={"center"} border={"1px solid #d3d3d3"}>
          <Typography variant="body2" key={cell.name}>
            {cell.name}
          </Typography>
          </Box>
        );
        })}
        </Box>
      {clipboards.map((clipboard) => {
        return (
          <Typography variant="body1"
            key={clipboard.idx}
            onClick={() => {
              cl.writeText(clipboard.text);
              alert("Copied to clipboard");
            }}
          >
            {clipboard.text.substring(0, 60)}
          </Typography>
        );
      })}
      </Box>
  );
};

export default Clipboard;
