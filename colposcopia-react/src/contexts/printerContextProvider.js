import React, { useState } from "react";
import { PrinterContext } from "./printerContext";

const PrinterContextProvider = (props) => {
    const [patientInfo, setPatientInfo] = useState({
      id: 0,
      nombre: "",
      fecha_nacimiento: "",
      sexo:"",
      contacto: "",
      informacion_adicional: ""
    });
    const [showNavBar, setShowNavBar] = useState(true);

    return (
        <PrinterContext.Provider value={{
            patientInfo,
            setPatientInfo,
            showNavBar,
            setShowNavBar
        }}>{props.children}</PrinterContext.Provider>
    )
};

export default PrinterContextProvider;