import { ipcRenderer, clipboard as cl } from "electron"
import React, { useEffect } from "react"

interface IClipboard {
    idx: number;
    text: string;
    created_at: string;
}

const Clipboard = () => {
    const [clipboards, setClipboards] = React.useState<IClipboard[]>([])
    useEffect(() => {
        console.log("3123213123")
        ipcRenderer.on("clipboard-data", (_, message) => {
            console.log("message", message)
            setClipboards(message)
        });

        ipcRenderer.send("clipboard-data")
    },[])
    return (
        <div style={{overflow: "scroll"}}>
            adsfafffff
            {clipboards.map((clipboard) => {
                return (<h1 key={clipboard.idx} onClick={() => {
                    cl.writeText(clipboard.text)
                    alert("Copied to clipboard")
            }}>{clipboard.text.substring(0,60)}</h1>)
            })}
        </div>
    )
}

export default Clipboard

