import * as React from "react";
import {
  Paper,
  Button,
  Container,
  CssBaseline,
} from "@mui/material";


import { useNavigate } from "react-router-dom";


const { ipcRenderer } = window.require("electron");

export default function NewStudyOption() {
  const navigate = useNavigate();

  const saveHistory = () => {
    navigate("/patientHistory");
  };

  const goStudy = () => {
    navigate("/camara");
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Paper>
          <div className="flex flex-col justify-center mt-12">
            <div className="rounded rounded-lg bg-slate-200 dark:bg-white/10 mb-7">
              <div className="flex px-4 py-4 border-b border-gray-400 dark:border-gray-200">
                <div className="flex items-center">
                  <div className="ml-4">
                    <h2 className="text-blue-400">Imagenes seleccionadas</h2>
                  </div>
                </div>
              </div>
              <div className="container sub-container-narrow p-8">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                  <div className="text-center">
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={saveHistory}
                    >
                      Imprimir reporte simple
                    </Button>
                  </div>
                  <div className="text-center">
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={goStudy}
                    >
                      Completar reporte
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
