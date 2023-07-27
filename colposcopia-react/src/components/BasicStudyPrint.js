import * as React from "react";
import {
  Paper,
  Button,
  Container,
  CssBaseline,
  TextField,
} from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MenuItem from "@mui/material/MenuItem";
import ReactHookFormSelect from "./SelectInput";
import { useForm, Controller } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import ModalView from "./Modal";

const { ipcRenderer } = window.require("electron");

export default function NewPatient() {

  const navigate = useNavigate();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      nombre: "",
      fecha_nacimiento: "",
      sexo:"",
      contacto: "",
      informacion_adicional: ""
    },
  });
  const onSubmit = (data) => {
    data.fecha_nacimiento = data.fecha_nacimiento.format("DD/MM/YYYY")
    //console.log(data);
    ipcRenderer.send("save_patient:submit", data);
    //ipcRenderer.removeAllListeners("save_patient:result");
    ipcRenderer.on("save_patient:result", (event, result) => {
      localStorage.setItem('patient', JSON.stringify(result));
      navigate("/newPatientOption")
    });
  }

  const getImgs = () => {
    let imgs = [];
    const maxImg = localStorage.getItem("img");

    for (let i = 0; i < maxImg; i++) {
        imgs.push(`../studies/temp/${i}.jpeg`);
        if (selected[i] === undefined)
            selected.push(false);
    }
    
    return imgs;
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
                    <h2 className="text-blue-400">Datos del Paciente</h2>
                  </div>
                </div>
              </div>
              <div className="container sub-container-narrow p-8">
                <form onSubmit={handleSubmit(onSubmit)} id="new_patient">
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Controller
                        name="nombre"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            required
                            label="Nombre del Paciente"
                            variant="filled"
                          />
                        )}
                      />
                      <Controller
                        name="fecha_nacimiento"
                        control={control}
                        render={({ field }) => (
                          <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                          >
                            <DatePicker 
                            {...field}
                            format={ "DD/MM/YYYY" }
                            label="Fecha de Nacimiento"
                             />
                          </LocalizationProvider>
                        )}
                      />

                      <ReactHookFormSelect
                        id="sexo"
                        name="sexo"
                        label="Sexo"
                        control={control}
                        defaultValue={"Femenino"}
                        variant="outlined"
                      >
                        <MenuItem value="Femenino">Femenino</MenuItem>
                        <MenuItem value="Masculino">Maculino</MenuItem>
                      </ReactHookFormSelect>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                    <Controller
                        name="contacto"
                        control={control}
                        render={({ field }) => (
                            <TextField
                            {...field}
                            required
                            label="Contacto (Telefono o email)"
                            variant="filled"
                          />
                        )}
                      />
                    <Controller
                        name="informacion_adicional"
                        control={control}
                        render={({ field }) => (
                            <TextField
                            {...field}
                        label="Informacion Adicional"
                        variant="filled"
                      />
                        )}
                      />               
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center mt-12">
            <div className="rounded rounded-lg bg-slate-200 dark:bg-white/10 mb-7">
              <div className="container sub-container-narrow p-8">
                <form onSubmit={handleSubmit(onSubmit)} id="new_patient">
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
                  {getImgs().map((src, i) => (
                    <div 
                    key={i}
                    >
                    <img
                        id={`photo${i}`}
                        alt="The screen capture will appear in this box."
                        src={src}
                        className="m-auto"
                      ></img>
                      
                    </div>
                  ))}
                  </div>
                  <div className="flex items-center justify-center px-8">
                    <div className="flex flex-shrink-0 mt-10 ml-auto">
                      <Button
                        type="submit"
                        variant="contained"
                        className="text-end"
                      >
                        Imprimir
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </Paper>
      </Container>
    </React.Fragment>
  );
}
