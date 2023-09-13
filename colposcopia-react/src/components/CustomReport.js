import * as React from "react";
import {
  Paper,
  Button,
  Container,
  CssBaseline,
  TextField,
} from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import { MuiFileInput } from "mui-file-input";

import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const { ipcRenderer } = window.require("electron");

export default function CustomReport() {
  const navigate = useNavigate();

  const [file, setFile] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      clinica: "",
      direccion: "",
      responsable: "",
      cedula: "",
    },
  });
  const onSubmit = (data) => {
    if (file != null) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        let value = reader.result;
        ipcRenderer.send("update_clinic:submit", data, value);
        ipcRenderer.removeAllListeners("update_clinic:result");
        ipcRenderer.on("update_clinic:result", (event, result) => {
          setOpen(true);
        });
      };
    } else {
      ipcRenderer.send("update_clinic:submit", data);
      ipcRenderer.removeAllListeners("update_clinic:result");
      ipcRenderer.on("update_clinic:result", (event, result) => {
        setOpen(true);
      });
    }
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
                    <h2 className="text-blue-400">Registrar Clinica</h2>
                  </div>
                </div>
              </div>
              <div className="container sub-container-narrow p-8">
                <form onSubmit={handleSubmit(onSubmit)} id="new_patient">
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Controller
                        name="clinica"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            required
                            label="Clinica"
                            variant="filled"
                          />
                        )}
                      />
                      <Controller
                        name="direccion"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            required
                            label="Dirección"
                            variant="filled"
                          />
                        )}
                      />
                      <Controller
                        name="responsable"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            required
                            label="Responsable"
                            variant="filled"
                          />
                        )}
                      />
                      <Controller
                        name="cedula"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            required
                            label="Cedula"
                            variant="filled"
                          />
                        )}
                      />
                    </div>
                    <MuiFileInput
                      value={file}
                      onChange={(file) => setFile(file)}
                    />
                  </div>
                  <div className="flex items-center justify-center px-8">
                    <div className="flex flex-shrink-0 mt-10 ml-auto">
                      <Button
                        type="submit"
                        variant="contained"
                        className="text-end"
                      >
                        Guardar
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Reporte
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Se personalizo el reporte correctamente
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)} autoFocus>
                ok
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
