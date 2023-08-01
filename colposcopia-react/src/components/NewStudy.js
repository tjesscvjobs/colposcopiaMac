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


const { ipcRenderer } = window.require("electron");

export default function NewStudy() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      fecha: "",
      vulva_vagina: "",
      colposcopia: "",
      cervix: "",
      zonaTransformacion: "",
      epitelioAcetoblanco: "",
      bordes: "",
      superficie: "",
      pruebaSchiller: "",
      observaciones: "",
      diagnosticoColposcopico: "",
      otras: "",
      planAccion: "",
    },
  });
  const onSubmit = (data) => {
    data.fecha = data.fecha.format("DD/MM/YYYY");
    //console.log(data);
    ipcRenderer.send("save_patient:submit", data);
    //ipcRenderer.removeAllListeners("save_patient:result");
    ipcRenderer.on("save_patient:result", (event, result) => {
      console.log(result);
      localStorage.setItem("patient", JSON.stringify(result));
    });
  };

  
  const getImgs = () => {
    let imgs = [];
    const maxImg = localStorage.getItem("img");

    for (let i = 0; i < maxImg; i++) {
        imgs.push(`../studies/temp/${i}.jpeg`);
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
                    <h2 className="text-blue-400">Registrar Paciente</h2>
                  </div>
                </div>
              </div>
              <div className="container sub-container-narrow p-8">
                <form onSubmit={handleSubmit(onSubmit)} id="new_patient">
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                      <Controller
                        name="vulva_vagina"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            required
                            label="Vulva y Vagina"
                            variant="filled"
                          />
                        )}
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                        <ReactHookFormSelect
                          id="colposcopia"
                          name="colposcopia"
                          label="Colposcopia"
                          control={control}
                          defaultValue={"Adecuada"}
                          variant="outlined"
                        >
                          <MenuItem value="Adecuada">Adecuada</MenuItem>
                          <MenuItem value="No adecuada">No adecuada</MenuItem>
                        </ReactHookFormSelect>
                        <ReactHookFormSelect
                          id="cervix"
                          name="cervix"
                          label="Cervix"
                          control={control}
                          defaultValue={"Autrofico"}
                          variant="outlined"
                        >
                          <MenuItem value="Autrófico">Autrófico</MenuItem>
                          <MenuItem value="Eutrófico">Eutrófico</MenuItem>
                          <MenuItem value="Hipertrófico">Hipertrófico</MenuItem>
                          <MenuItem value="Hipotrófico">Hipotrófico</MenuItem>
                        </ReactHookFormSelect>
                        <ReactHookFormSelect
                          id="zonaTransformacion"
                          name="zonaTransformacion"
                          label="Zona de Transformacion"
                          control={control}
                          defaultValue={"Normal"}
                          variant="outlined"
                        >
                          <MenuItem value="Normal">Normal</MenuItem>
                          <MenuItem value="Tipo 1">Tipo 1</MenuItem>
                          <MenuItem value="Tipo 2">Tipo 2</MenuItem>
                          <MenuItem value="Tipo 3">Tipo 3</MenuItem>
                          <MenuItem value="Anormal">Anormal</MenuItem>
                          <MenuItem value="Pequeña">Pequeña</MenuItem>
                          <MenuItem value="Intermedia">Intermedia</MenuItem>
                          <MenuItem value="Amplia">Amplia</MenuItem>
                        </ReactHookFormSelect>
                        <ReactHookFormSelect
                          id="epitelioAcetoblanco"
                          name="epitelioAcetoblanco"
                          label="Epitelio Acetoblanco"
                          control={control}
                          defaultValue={"Presente"}
                          variant="outlined"
                        >
                          <MenuItem value="Presente">Presente</MenuItem>
                          <MenuItem value="Ausente">Ausente</MenuItem>
                          <MenuItem value="Blanco fino">Blanco fino</MenuItem>
                          <MenuItem value="Blanco grueso">
                            Blanco grueso
                          </MenuItem>
                          <MenuItem value="Acetofugaz">Acetofugaz</MenuItem>
                        </ReactHookFormSelect>
                        <ReactHookFormSelect
                          id="bordes"
                          name="bordes"
                          label="Bordes"
                          control={control}
                          defaultValue={"Definidos"}
                          variant="outlined"
                        >
                          <MenuItem value="Definidos">Definidos</MenuItem>
                          <MenuItem value="Difusos">Difusos</MenuItem>
                          <MenuItem value="Con relieve">Con relieve</MenuItem>
                          <MenuItem value="Sin relieve">Sin relieve</MenuItem>
                        </ReactHookFormSelect>
                        <ReactHookFormSelect
                          id="superficie"
                          name="superficie"
                          label="Superficie"
                          control={control}
                          defaultValue={"Micropapilar"}
                          variant="outlined"
                        >
                          <MenuItem value="Micropapilar">Micropapilar</MenuItem>
                          <MenuItem value="Puntilleo fino">
                            Puntilleo fino
                          </MenuItem>
                          <MenuItem value="Puntilleo grueso">
                            Puntilleo grueso
                          </MenuItem>
                          <MenuItem value="Mosaico fino">Mosaico fino</MenuItem>
                          <MenuItem value="Mosaico grueso">
                            Mosaico grueso
                          </MenuItem>
                        </ReactHookFormSelect>
                      </div>
                      <ReactHookFormSelect
                        id="pruebaSchiller"
                        name="pruebaSchiller"
                        label="Prueba Schiller"
                        control={control}
                        defaultValue={"Positivo"}
                        variant="outlined"
                      >
                        <MenuItem value="Positivo">Positivo</MenuItem>
                        <MenuItem value="Negativo">Negativo</MenuItem>
                      </ReactHookFormSelect>
                      <Controller
                        name="observaciones"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            required
                            label="Observaciones"
                            variant="filled"
                          />
                        )}
                      />
                      <ReactHookFormSelect
                        id="diagnosticoColposcopico"
                        name="diagnosticoColposcopico"
                        label="Diagnostico Colposcopico"
                        control={control}
                        defaultValue={"Sin Alteraciones"}
                        variant="outlined"
                      >
                        <MenuItem value="Sin Alteraciones">
                          Sin Alteraciones
                        </MenuItem>
                        <MenuItem value="IVPH">IVPH</MenuItem>
                        <MenuItem value="NIC">NIC</MenuItem>
                        <MenuItem value="Neoplasia invasora">
                          Neoplasia invasora
                        </MenuItem>
                        <MenuItem value="Lesiones sugestivas de invasion">
                          Lesiones sugestivas de invasion
                        </MenuItem>
                        <MenuItem value="Lesion Intraepitelial de bajo grado LIBG">
                          Lesion Intraepitelial de bajo grado LIBG
                        </MenuItem>
                        <MenuItem value="Lesion Intraepitelial de alto grado LIAG">
                          Lesion Intraepitelial de alto grado LIAG
                        </MenuItem>
                      </ReactHookFormSelect>
                      <ReactHookFormSelect
                        id="otras"
                        name="otras"
                        label="Otras"
                        control={control}
                        defaultValue={"Sin Alteraciones"}
                        variant="outlined"
                      >
                        <MenuItem value="Ninguna">Ninguna</MenuItem>
                        <MenuItem value="Condilomas">Condilomas</MenuItem>
                        <MenuItem value="Pólipo">Pólipo</MenuItem>
                        <MenuItem value="Quistes">Quistes</MenuItem>
                        <MenuItem value="Fibroma">Fibroma</MenuItem>
                        <MenuItem value="Adenosis">Adenosis</MenuItem>
                        <MenuItem value="Eversion glandular">
                          Eversion glandular
                        </MenuItem>
                        <MenuItem value="Deciduosis">Deciduosis</MenuItem>
                      </ReactHookFormSelect>
                      <Controller
                        name="planAccion"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            required
                            label="Plan de Accion"
                            variant="filled"
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col justify-center mt-12">
                    <div className="rounded rounded-lg bg-slate-200 dark:bg-white/10 mb-7">
                      <div className="container sub-container-narrow p-8">
                        <form
                          onSubmit={handleSubmit(onSubmit)}
                          id="new_patient"
                        >
                          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
                            {getImgs().map((src, i) => (
                              <div key={i}>
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
        </Paper>
      </Container>
    </React.Fragment>
  );
}
