import * as React from "react";
import { Paper, Button, CssBaseline } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { PrinterContext } from "../contexts/printerContext";

const { ipcRenderer } = window.require("electron");

const patient = JSON.parse(localStorage.getItem("patient"));
const study = JSON.parse(localStorage.getItem("study"));

export default function ListHistoryStudy() {
  const navigate = useNavigate();
  const printerContext = React.useContext(PrinterContext);
  const [clinic, setClinic] = React.useState({});

  const onPrint = () => {
    printerContext.setShowNavBar(false);
  };

  const getClinic = () => {
    ipcRenderer.send("get_clinic:submit");
    //ipcRenderer.removeAllListeners("save_patient:result");
    ipcRenderer.on("get_clinic:result", (event, result) => {
      setClinic(result);
    });
  };

  React.useEffect(() => {
    if (!printerContext.showNavBar) {
      window.print();
      printerContext.setShowNavBar(true);
    }
  }, [printerContext.showNavBar]);

  React.useEffect(() => {
    getClinic();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper>
        <div className="flex flex-col justify-center mt-12">
          <div className="rounded rounded-lg bg-slate-200 dark:bg-white/10 mb-7">
            <div className="container sub-container-narrow p-8">
              <div className="flex py-4 border-b border-gray-400 dark:border-gray-200">
                <div className="flex items-center">
                  <div>
                    <h2 className="text-blue-400">Datos del Paciente</h2>
                  </div>
                </div>
              </div>
              <div className="flex">
                <strong>Nombre:</strong>
                <p className="ml-2">{patient.nombre}</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 text-center">
                <div className="flex">
                  <strong>Sexo:</strong>
                  <p className="ml-2">{patient.sexo}</p>
                </div>
                <div className="flex">
                  <strong>Fecha de Nacimiento:</strong>
                  <p className="ml-2">{patient.fecha_nacimiento}</p>
                </div>
              </div>

              <div className="flex">
                <strong>Contacto:</strong>
                <p className="ml-2">{patient.contacto}</p>
              </div>

              <div className="flex">
                <strong>Informacion adicional:</strong>
                <p className="ml-2">{patient.informacion_adicional}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 mt-4">
                <div className="flex items-center">
                  <div>
                    <h2 className="text-blue-400">Estudios</h2>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 hover:bg-sky-300 p-2">
                  <div>
                    <strong>Fecha</strong>
                  </div>
                </div>
                {}
              </div>
            </div>
          </div>
        </div>
      </Paper>
    </React.Fragment>
  );
}
