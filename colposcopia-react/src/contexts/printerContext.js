import { createContext } from "react";

export const PrinterContext = createContext({
    patientInfo: {},
    setPatientInfo: (value) => {},
    showNavBar: true,
    setShowNavBar: (value) => {}
})