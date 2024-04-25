import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ipcRenderer } from "electron";
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
  const headerCells = [
    { name: "idx", width: 80 },
    { name: "text", width: "50%" },
    { name: "length", width: 150 },
    { name: "created_at", width: 200 },
  ];
  return (
    <TableContainer>
    
      <Table size="small">
        <TableHead>
          <TableRow>
            {headerCells.map((cell) => {
              return (
                <TableCell width={cell.width} key={cell.name} align="center">
                  <Typography variant="body2" key={cell.name}>
                    {cell.name}
                  </Typography>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {clipboards?.map((clipboard) => {
            return (
              <TableRow
                key={clipboard.idx}
                sx={{
                  "td, th": { border: 0 },
                  ":hover": { backgroundColor: "#2f2f2f", cursor: "pointer" },
                }}
                onClick={() =>
                  ipcRenderer.send("clipboard-change", clipboard.text)
                }
              >
                <TableCell align="center">
                  <Typography>{clipboard.idx}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{clipboard.text.substring(0,40)}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography>{clipboard.text.length}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography>{clipboard.created_at}</Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Clipboard;
