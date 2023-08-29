import { createContext } from "react";

export const FilePathContext = createContext({
    filePath: '',
    setFilePath: (value) => {},
})