import React, { useState } from "react";
import { FilePathContext } from "./filePathContext";
const { ipcRenderer } = window.require("electron");

const FilePathContextProvider = (props) => {
    const [filePath, setFilePath] = useState('');

    React.useEffect(() => {
        console.log("get path");
        ipcRenderer.send("get_filepath:submit");
        //ipcRenderer.removeAllListeners("save_patient:result");
        ipcRenderer.on("get_filepath:result", (event, result) => {
            setFilePath(result)
        });
      }, []);

    return (
        <FilePathContext.Provider value={{
            filePath,
            setFilePath,
        }}>{props.children}</FilePathContext.Provider>
    )
};

export default FilePathContextProvider;