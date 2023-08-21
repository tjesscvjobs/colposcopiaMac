import * as React from "react";
import { Paper, Button, CssBaseline, Container } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { PrinterContext } from "../contexts/printerContext";
import { HiPlusCircle } from "react-icons/hi";

const { ipcRenderer } = window.require("electron");

const study = JSON.parse(localStorage.getItem("study"));

export default function ListHistoryStudy() {
  const navigate = useNavigate();
  const printerContext = React.useContext(PrinterContext);
  const [history, setHistory] = React.useState({});
  const [patient, setPatient] = React.useState({});
  const [isOpen, setIsOpen] = React.useState(false);
  const [pregnancies, setPregnancies] = React.useState([]);
  const [medicalHistory, setMedicalHistory] = React.useState([]);

  const selecStudy = (study) => {
    localStorage.setItem("study", JSON.stringify(study));
    navigate("/studyPrintHistory");
  };

  const getHistory = () => {
    ipcRenderer.send("get_studies:submit", patient.id);
    ipcRenderer.removeAllListeners("get_studies:result");
    ipcRenderer.on("get_studies:result", (event, result) => {
      setMedicalHistory(result);
    });
  };

  const getMedicalHistory = () => {
    ipcRenderer.send("get_medical_history:submit", patient.id);
    ipcRenderer.removeAllListeners("get_medical_history:result");
    ipcRenderer.on("get_medical_history:result", (event, result) => {
      setHistory(result.history);
      setPregnancies(result.pregnancies);
    });
  };

  React.useEffect(() => {
    if (!printerContext.showNavBar) {
      window.print();
      printerContext.setShowNavBar(true);
    }
  }, [printerContext.showNavBar]);

  React.useEffect(() => {
    getHistory();
    getMedicalHistory();
    setPatient(JSON.parse(localStorage.getItem("patient")));
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
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
                      <h2 className="text-blue-400">Historia Clinica</h2>
                    </div>
                    {history.menarca == null &&
                    (<div className="ml-4 cursor-pointer hover:text-blue-400">
                      <HiPlusCircle onClick={() => navigate("/patientHistory")} />
                    </div>)}
                  </div>
                  {history.menarca != null && (
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                      <h1>Antecedentes Gineco-Obstetricos</h1>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        <div className="flex">
                          <strong>Menarca:</strong>
                          <p className="ml-2">{history.menarca}</p>
                        </div>
                        <div className="flex">
                          <strong>Ritmo:</strong>
                          <p className="ml-2">{history.ritmo}</p>
                        </div>
                        <div className="flex">
                          <strong>IVSA:</strong>
                          <p className="ml-2">{history.ivsa}</p>
                        </div>
                        <div className="flex">
                          <strong>Parejas:</strong>
                          <p className="ml-2">{history.parejas}</p>
                        </div>
                        <div className="flex">
                          <strong>G:</strong>
                          <p className="ml-2">{history.g}</p>
                        </div>
                        <div className="flex">
                          <strong>P:</strong>
                          <p className="ml-2">{history.p}</p>
                        </div>
                        <div className="flex">
                          <strong>A:</strong>
                          <p className="ml-2">{history.a}</p>
                        </div>
                        <div className="flex">
                          <strong>C:</strong>
                          <p className="ml-2">{history.c}</p>
                        </div>
                        <div className="flex">
                          <strong>MPF:</strong>
                          <p className="ml-2">{history.mpf}</p>
                        </div>
                        <div className="flex">
                          <strong>FUM:</strong>
                          <p className="ml-2">{history.fum}</p>
                        </div>
                        <div className="flex">
                          <strong>FPP:</strong>
                          <p className="ml-2">{history.fpp}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="flex">
                          <strong>Embarazos Ectopicos:</strong>
                          <p className="ml-2">{history.embarazoEctopico}</p>
                        </div>
                        <div className="flex">
                          <strong>Ant. Cáncer Familiar:</strong>
                          <p className="ml-2">{history.cancerFamiliar}</p>
                        </div>
                        <div className="flex">
                          <strong>Dispareunia:</strong>
                          <p className="ml-2">{history.dispareunia}</p>
                        </div>
                        <div className="flex">
                          <strong>Tratamiento Hormonal:</strong>
                          <p className="ml-2">{history.tratamientoHormonal}</p>
                        </div>
                        <div className="flex">
                          <strong>Dismenorrea:</strong>
                          <p className="ml-2">{history.dismenorrea}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                        <div>
                          {!isOpen && (
                            <div className="flow-root mt-5">
                              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 gap-4">
                                  <div>
                                    <h1>Registro de Embarazos Anteriores</h1>
                                  </div>
                                  <div>
                                    <table className="divide-y divide-gray-300 w-full mt-5">
                                      <thead>
                                        <tr className="font-semibold text-left text-sm">
                                          <th className="px-3 py-2 text-center">
                                            Año de parto
                                          </th>
                                          <th className="px-3 py-2 text-center">
                                            Termino o Pretermino
                                          </th>
                                          <th className="px-3 py-2 text-center">
                                            Resolución
                                          </th>
                                          <th className="px-3 py-2 text-center">
                                            Sexo
                                          </th>
                                          <th className="px-3 py-2 text-center">
                                            Peso
                                          </th>
                                          <th className="px-3 py-2 text-center">
                                            Evolución
                                          </th>
                                          <th className="px-3 py-2 text-center">
                                            Alimentación
                                          </th>
                                          <th className="px-3 py-2 text-center">
                                            Comentarios
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-gray-300 dark:divide-gray-700 text-sm">
                                        {pregnancies.map((p, x) => (
                                          /*
                                        {
                                          anoParto: anoParto,
                                          termino: termino,
                                          resolucion: resolucion,
                                          sexo: sexo,
                                          peso: peso,
                                          evolucion: evolucion,
                                          alimentacion: alimentacion,
                                          comentarios: comentarios,
                                        }
                                        */
                                          <tr key={`pregnancy-${x}`}>
                                            <td className="text-center">
                                              {p.anoParto}
                                            </td>
                                            <td className="text-center">
                                              {p.termino}
                                            </td>
                                            <td className="text-center">
                                              {p.resolucion}
                                            </td>
                                            <td className="text-center">
                                              {p.sexo}
                                            </td>
                                            <td className="text-center">
                                              {p.peso}
                                            </td>
                                            <td className="text-center">
                                              {p.evolucion}
                                            </td>
                                            <td className="text-center">
                                              {p.alimentacion}
                                            </td>
                                            <td className="text-center">
                                              {p.comentarios}
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <h1>Antecedentes Personales Patológicos</h1>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                        <div className="flex">
                          <strong>Enfermedades:</strong>
                          <p className="ml-2">{history.enfermedades}</p>
                        </div>
                        <div className="flex">
                          <strong>Medicamentos:</strong>
                          <p className="ml-2">{history.medicamentos}</p>
                        </div>
                        <div className="flex">
                          <strong>Adicciones:</strong>
                          <p className="ml-2">{history.adicciones}</p>
                        </div>
                        <div className="flex">
                          <strong>Alergias:</strong>
                          <p className="ml-2">{history.alergias}</p>
                        </div>
                        <div className="flex">
                          <strong>Transfusiones:</strong>
                          <p className="ml-2">{history.transfusiones}</p>
                        </div>
                        <div className="flex">
                          <strong>Quirurgicos:</strong>
                          <p className="ml-2">{history.quirurgicos}</p>
                        </div>
                        <div className="flex">
                          <strong>Grupo Sanguineo:</strong>
                          <p className="ml-2">{history.grupoSanguineo}</p>
                        </div>
                      </div>
                      <h1>Antecedentes Personales No Patológicos</h1>
                      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                        <div className="flex">
                          <strong>Antecedentes:</strong>
                          <p className="ml-2">
                            {history.antecedentesNoPatologicos}
                          </p>
                        </div>
                      </div>
                      <h1>Antecedentes Familiares Oncologicos</h1>
                      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                        <div className="flex">
                          <strong>Antecedentes:</strong>
                          <p className="ml-2">
                            {history.antecedesntesFamOncologicos}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 mt-4">
                  <div className="flex items-center">
                    <div>
                      <h2 className="text-blue-400">Estudios</h2>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 p-2">
                    <div>
                      <strong>No.</strong>
                    </div>
                    <div>
                      <strong>Fecha</strong>
                    </div>
                  </div>
                  {medicalHistory.map((study, i) => {
                    return (
                      <div
                        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 hover:bg-sky-300 p-2"
                        key={`${study.id}`}
                        onClick={() => selecStudy(study)}
                      >
                        <div>
                          <strong>{i + 1}</strong>
                        </div>
                        <div>
                          <strong>
                            {new Date(study.fecha).toLocaleDateString()}
                          </strong>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
