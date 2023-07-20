import * as React from "react";
import {
  Paper,
  Button,
  Container,
  CssBaseline,
  TextField,
} from "@mui/material";

import MenuItem from "@mui/material/MenuItem";

import ReactHookFormSelect from "./SelectInput";
import { useForm, Controller } from "react-hook-form";

import Pregnancies from "./Pregnancies";

export default function PatientHistory() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [display, setDisplay] = React.useState(true);
  const [pregnancies, setPregnancies] = React.useState([]);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      menarca: "",
      ritmo: "",
      ivsa: "",
      parejas: "",
      g: "",
      p: "",
      a: "",
      c: "",
      mpf: "",
      fum: "",
      fpp: "",
      embarazoEctopico: "",
      cancerFamiliar: "",
      dispareunia: "",
      tratamientoHormonal: "",
      dismenorrea: "",
      enfermedades: "",
      medicamentos: "",
      adicciones: "",
      alergias: "",
      transfusiones: "",
      quirurgicos: "",
      grupoSanguineo: "",
      antecedentesNoPatologicos: "",
      antecedesntesFamOncologicos: "",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
  };

  const handleAddPregnancy = (pregnancy) => {
    setPregnancies((prev) => {
      let newValue = [...prev, pregnancy];

      return newValue;
    });
    setIsOpen(!isOpen);
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
                    <h2 className="text-blue-400">
                      Historia Clinica del Paciente
                    </h2>
                  </div>
                </div>
              </div>
              <div className="container sub-container-narrow p-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                    <h1>Antecedentes Gineco-Obstetricos</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-11 gap-4">
                      <Controller
                        name="menarca"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            required
                            label="Menarca"
                            variant="filled"
                          />
                        )}
                      />
                      <Controller
                        name="ritmo"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            required
                            label="Ritmo"
                            variant="filled"
                          />
                        )}
                      />
                      <Controller
                        name="ivsa"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            required
                            label="IVSA"
                            variant="filled"
                          />
                        )}
                      />
                      <Controller
                        name="parejas"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            required
                            label="Parejas"
                            variant="filled"
                          />
                        )}
                      />
                      <Controller
                        name="g"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            required
                            label="G"
                            variant="filled"
                          />
                        )}
                      />
                      <Controller
                        name="p"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            required
                            label="P"
                            variant="filled"
                          />
                        )}
                      />
                      <Controller
                        name="a"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            required
                            label="A"
                            variant="filled"
                          />
                        )}
                      />
                      <Controller
                        name="c"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            required
                            label="C"
                            variant="filled"
                          />
                        )}
                      />
                      <Controller
                        name="mpf"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            required
                            label="MPF"
                            variant="filled"
                          />
                        )}
                      />
                      <Controller
                        name="fum"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            required
                            label="FUM"
                            variant="filled"
                          />
                        )}
                      />
                      <Controller
                        name="fpp"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            required
                            label="FPP"
                            variant="filled"
                          />
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <ReactHookFormSelect
                        id="embarazoEctopico"
                        name="embarazoEctopico"
                        label="Embarazos Ectopicos"
                        control={control}
                        defaultValue={"No"}
                        variant="outlined"
                      >
                        <MenuItem value="No">No</MenuItem>
                        <MenuItem value="Si">Si</MenuItem>
                      </ReactHookFormSelect>

                      <ReactHookFormSelect
                        id="antCancer"
                        name="antCancer"
                        label="Ant. Cáncer Familiar"
                        control={control}
                        variant="outlined"
                      >
                        <MenuItem value={"No"}>No</MenuItem>
                        <MenuItem value={"Endometrico"}>Endometrico</MenuItem>
                        <MenuItem value={"Mamario"}>Mamario</MenuItem>
                        <MenuItem value={"Ovarios"}>Ovarios</MenuItem>
                        <MenuItem value={"Otro"}>Otro</MenuItem>
                      </ReactHookFormSelect>

                      <ReactHookFormSelect
                        id="dispareunia"
                        name="dispareunia"
                        label="Dispareunia"
                        control={control}
                        variant="outlined"
                      >
                        <MenuItem value={"No"}>No</MenuItem>
                        <MenuItem value={"Leve"}>Leve</MenuItem>
                        <MenuItem value={"Moderada"}>Moderada</MenuItem>
                        <MenuItem value={"Severa"}>Severa</MenuItem>
                      </ReactHookFormSelect>

                      <ReactHookFormSelect
                        id="tratamientoHormonal"
                        name="tratamientoHormonal"
                        label="Tratamiento Hormonal"
                        control={control}
                        variant="outlined"
                      >
                        <MenuItem value={"No"}>No</MenuItem>
                        <MenuItem value={"Si"}>Si</MenuItem>
                      </ReactHookFormSelect>

                      <ReactHookFormSelect
                        id="dismenorrea"
                        name="dismenorrea"
                        label="Dismenorrea"
                        control={control}
                        variant="outlined"
                      >
                        <MenuItem value={"No"}>No</MenuItem>
                        <MenuItem value={"Si"}>Si</MenuItem>
                      </ReactHookFormSelect>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                      <div>
                        {!isOpen ? (
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
                        ) : (
                          <Pregnancies
                            handleAddPregnancy={handleAddPregnancy}
                          />
                        )}
                        <div className="grid">
                          <Button
                            onClick={() => {
                              setIsOpen(!isOpen);
                              setDisplay(!display);
                            }}
                            sx={{
                              display: display ? "block" : "hidden",
                            }}
                          >
                            Agregar
                          </Button>
                        </div>
                      </div>
                    </div>
                    <h1>Antecedentes Personales Patológicos</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-7 gap-4">
                      <ReactHookFormSelect
                        id="enfermedades"
                        name="enfermedades"
                        label="Enfermedades"
                        control={control}
                        defaultValue={"No"}
                        variant="outlined"
                      >
                        <MenuItem value="No">No</MenuItem>
                        <MenuItem value="Si">Si</MenuItem>
                      </ReactHookFormSelect>

                      <ReactHookFormSelect
                        id="medicamentos"
                        name="medicamentos"
                        label="Medicamentos"
                        control={control}
                        defaultValue={"No"}
                        variant="outlined"
                      >
                        <MenuItem value="No">No</MenuItem>
                        <MenuItem value="Si">Si</MenuItem>
                      </ReactHookFormSelect>

                      <ReactHookFormSelect
                        id="adicciones"
                        name="adicciones"
                        label="Adicciones"
                        control={control}
                        defaultValue={"No"}
                        variant="outlined"
                      >
                        <MenuItem value="No">No</MenuItem>
                        <MenuItem value="Si">Si</MenuItem>
                      </ReactHookFormSelect>

                      <Controller
                        name="alergias"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            required
                            label="Alergias"
                            variant="filled"
                          />
                        )}
                      />
                      <Controller
                        name="transfusiones"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            required
                            label="Transfusiones"
                            variant="filled"
                          />
                        )}
                      />
                      <Controller
                        name="quirurgicos"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            required
                            label="Quirurgicos"
                            variant="filled"
                          />
                        )}
                      />

                      <ReactHookFormSelect
                        id="grupoSanguineo"
                        name="grupoSanguineo"
                        label="Grupo Sanguineo"
                        control={control}
                        defaultValue={"No"}
                        variant="outlined"
                      >
                        <MenuItem value="No">No</MenuItem>
                        <MenuItem value="Si">Si</MenuItem>
                      </ReactHookFormSelect>
                    </div>
                    <h1>Antecedentes Personales No Patológicos</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                      <Controller
                        name="antecedentesNoPatologicos"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            required
                            label="Antecedentes"
                            variant="filled"
                          />
                        )}
                      />
                    </div>
                    <h1>Antecedentes Familiares Oncologicos</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                      <Controller
                        name="antecedesntesFamOncologicos"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            required
                            label="Antecedentes"
                            variant="filled"
                          />
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
        </Paper>
      </Container>
    </React.Fragment>
  );
}
