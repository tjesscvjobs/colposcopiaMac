import * as React from "react";
import {
  Paper,
  Button,
  Container,
  CssBaseline,
  TextField,
} from "@mui/material";

import { useForm, Controller, set } from "react-hook-form";
import { MuiFileInput } from "mui-file-input";

import { useNavigate } from "react-router-dom";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const { ipcRenderer } = window.require("electron");

export default function NewAppointment() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      start: "",
    },
  });
  const onSubmit = (data) => {
    data.start = new Date(data.start).toISOString();
    ipcRenderer.send("create_appointment:submit", data);
    //ipcRenderer.removeAllListeners("save_patient:result");
    ipcRenderer.on("create_appointment:result", (event, result) => {
      setOpen(true);

    });
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
                    <h2 className="text-blue-400">Registrar Cita</h2>
                  </div>
                </div>
              </div>
              <div className="container sub-container-narrow p-8">
                <form onSubmit={handleSubmit(onSubmit)} id="new_patient">
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            required
                            label="Paciente"
                            variant="filled"
                          />
                        )}
                      />
                      <Controller
                        name="start"
                        control={control}
                        render={({ field }) => (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker {...field} label="Fecha y Hora" />
                          </LocalizationProvider>
                        )}
                      />
                    </div>
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
              Cita
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Se registro la cita
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
