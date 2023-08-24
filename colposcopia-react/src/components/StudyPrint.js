import * as React from "react";
import {
  Paper,
  Button,
  CssBaseline,
} from "@mui/material";


import { useNavigate } from "react-router-dom";
import { PrinterContext } from "../contexts/printerContext";

const { ipcRenderer } = window.require("electron");



export default function StudyPrint() {
  const navigate = useNavigate();
  const printerContext = React.useContext(PrinterContext);
  const [clinic, setClinic] = React.useState({});
  const [patient, setPatient] = React.useState({});
  const [study, setStudy] = React.useState({});

  const onPrint = () => {
    printerContext.setShowNavBar(false);
  };

  const getClinic = () => {
    ipcRenderer.send("get_clinic:submit");
    ipcRenderer.on("get_clinic:result", (event, result) => {
      setClinic(result);
    });
  };

  const getImgs = () => {
    let imgs = [];
    const maxImg = localStorage.getItem("img");

    for (let i = 0; i < maxImg; i++) {
      imgs.push(`studies/patient/${study.id}-${i}.jpeg`);
    }

    return imgs;
  };

  React.useEffect(() => {
    if (!printerContext.showNavBar) {
      window.print();
      printerContext.setShowNavBar(true);
    }
  }, [printerContext.showNavBar]);

  React.useEffect(() => {
    getClinic();
    setPatient(JSON.parse(localStorage.getItem("patient")));
    setStudy(JSON.parse(localStorage.getItem("study")))
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper>
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4">
          <div>
            <img
              id={`logo1`}
              alt="The screen capture will appear in this box."
              src={`../img/logo-medical.png`}
              className="m-auto"
              style={{ maxHeight: "30px" }}
            ></img>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-1 text-center">
            <strong className="text-xs">{clinic.clinica}</strong>
            <strong className="text-xs">{clinic.direccion}</strong>
            <strong className="text-xs">{clinic.responsable}</strong>
            <strong className="text-xs">{clinic.cedula}</strong>
          </div>
          <div>
            <img
              id={`logo2`}
              alt="The screen capture will appear in this box."
              src={`../img/logo-medical_1.png`}
              className="m-auto"
              style={{ maxHeight: "60px" }}
            ></img>
          </div>
        </div>
      </Paper>

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

              <div className="flex justify-end">
                <strong>Fecha del estudio:</strong>
                <p className="ml-2">{new Date().toLocaleDateString()}</p>
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

              <div className="flex py-4 border-b border-gray-400 dark:border-gray-200">
                <div className="flex items-center">
                  <div>
                    <h2 className="text-blue-400">Colposcopia</h2>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                  <div className="flex">
                    <strong>Vulva y Vagina:</strong>
                    <p className="ml-2">{study.vulva_vagina}</p>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    <div className="flex">
                      <strong>Colposcopia:</strong>
                      <p className="ml-2">{study.colposcopia}</p>
                    </div>
                    <div className="flex">
                      <strong>Cervix:</strong>
                      <p className="ml-2">{study.cervix}</p>
                    </div>
                    <div className="flex">
                      <strong>Zona de transformacion:</strong>
                      <p className="ml-2">{study.zonaTransformacion}</p>
                    </div>
                    <div className="flex">
                      <strong>Epitelio Acetoblanco:</strong>
                      <p className="ml-2">{study.epitelioAcetoblanco}</p>
                    </div>
                    <div className="flex">
                      <strong>Bordes:</strong>
                      <p className="ml-2">{study.bordes}</p>
                    </div>
                    <div className="flex">
                      <strong>Superficie:</strong>
                      <p className="ml-2">{study.superficie}</p>
                    </div>
                  </div>
                  <div className="flex">
                    <strong>Prueba Schiller:</strong>
                    <p className="ml-2">{study.pruebaSchiller}</p>
                  </div>
                  <div className="flex">
                    <strong>Observaciones:</strong>
                    <p className="ml-2">{study.observaciones}</p>
                  </div>
                  <div className="flex">
                    <strong>Diagnostico Colposcopico:</strong>
                    <p className="ml-2">{study.diagnosticoColposcopico}</p>
                  </div>
                  <div className="flex">
                    <strong>Otras:</strong>
                    <p className="ml-2">{study.otras}</p>
                  </div>
                  <div className="flex">
                    <strong>Plan de Acción:</strong>
                    <p className="ml-2">{study.planAccion}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Paper>

      <Paper>
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-52">
          <div>
            <img
              id={`logo1`}
              alt="The screen capture will appear in this box."
              src={`../img/logo-medical_1.png`}
              className="m-auto"
              style={{ maxHeight: "30px" }}
            ></img>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-1 text-center">
            <strong className="text-xs">{clinic.clinica}</strong>
            <strong className="text-xs">{clinic.direccion}</strong>
            <strong className="text-xs">{clinic.responsable}</strong>
            <strong className="text-xs">{clinic.cedula}</strong>
          </div>
          <div>
            <img
              id={`logo2`}
              alt="The screen capture will appear in this box."
              src={`../img/logo-medical.png`}
              className="m-auto"
              style={{ maxHeight: "60px" }}
            ></img>
          </div>
        </div>
      </Paper>

      <Paper>
        <div className="flex flex-col justify-center mt-12">
          <div className="rounded rounded-lg bg-slate-200 dark:bg-white/10 mb-7">
            <div className="container sub-container-narrow p-8">
              <div className="flex py-4 border-b border-gray-400 dark:border-gray-200">
                <div className="flex items-center">
                  <div>
                    <h2 className="text-blue-400">Imagenes</h2>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-2">
                {getImgs().map((src, i) => (
                  <div key={i} className="items-center">
                    <img
                      id={`photo${i}`}
                      alt="The screen capture will appear in this box."
                      src={src}
                      className="m-auto"
                    ></img>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {printerContext.showNavBar && (
          <div className="flex flex-col justify-center mt-20">
            <div className="rounded rounded-lg bg-slate-200 dark:bg-white/10 mb-7">
              <div className="container sub-container-narrow p-8">
                <div className="flex items-center justify-center px-8">
                  <div className="flex flex-shrink-0 mt-10 ml-auto">
                    <Button
                      variant="contained"
                      className="text-end"
                      onClick={onPrint}
                    >
                      Imprimir
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Paper>
    </React.Fragment>
  );
}
