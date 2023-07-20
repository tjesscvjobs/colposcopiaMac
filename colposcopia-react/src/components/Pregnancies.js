import * as React from "react";
import {
  Paper,
  Button,
  Container,
  CssBaseline,
  TextField,
} from "@mui/material";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

export default function Pregnancies(props) {
  const [anoParto, setAnoParto] = React.useState("");
  const [termino, setTermino] = React.useState("");
  const [resolucion, setResolucion] = React.useState("");
  const [sexo, setSexo] = React.useState("");
  const [peso, setPeso] = React.useState("");
  const [evolucion, setEvolucion] = React.useState("");
  const [alimentacion, setAlimentacion] = React.useState("");
  const [comentarios, setComentarios] = React.useState("");

  const onSubmitEmb = () => {
    let data = {
      anoParto: anoParto,
      termino: termino,
      resolucion: resolucion,
      sexo: sexo,
      peso: peso,
      evolucion: evolucion,
      alimentacion: alimentacion,
      comentarios: comentarios,
    };
    console.log(data);
    if (props.handleAddPregnancy) props.handleAddPregnancy(data);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Paper>
          <div className="p-4">
            <h1>Registrar Embarazo</h1>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4 p-4">
            <TextField
              id="anoParto"
              name="anoParto"
              label="Año de parto"
              variant="filled"
              value={anoParto}
              onChange={(event) => setAnoParto(event.target.value)}
            />

            <FormControl fullWidth>
              <InputLabel id="termino-label">Termino</InputLabel>
              <Select
                id="termino"
                labelId="termino-label"
                name="termino"
                value={termino}
                label="Termino"
                onChange={(event) => setTermino(event.target.value)}
              >
                <MenuItem value={"Termino"}>Termino</MenuItem>
                <MenuItem value={"Pretermino"}>Pretermino</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="resolucion-label">Resolucion</InputLabel>
              <Select
                id="resolucion"
                labelId="resolucion-label"
                name="resolucion"
                value={resolucion}
                label="Resolucion"
                onChange={(event) => setResolucion(event.target.value)}
              >
                <MenuItem value={"Cesarea"}>Cesarea</MenuItem>
                <MenuItem value={"Parto"}>Parto</MenuItem>
                <MenuItem value={"LUI"}>LUI</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="sexo-label">Sexo</InputLabel>
              <Select
                id="sexo"
                labelId="sexo-label"
                name="sexo"
                value={sexo}
                label="Sexo"
                onChange={(event) => setSexo(event.target.value)}
              >
                <MenuItem value={"Masculino"}>Masculino</MenuItem>
                <MenuItem value={"Femenino"}>Femenino</MenuItem>
              </Select>
            </FormControl>

            <TextField
              id="peso"
              name="peso"
              label="Peso"
              variant="filled"
              value={peso}
              onChange={(event) => setPeso(event.target.value)}
            />

            <FormControl fullWidth>
              <InputLabel id="evolucion-label">Evolucion</InputLabel>
              <Select
                id="evolucion"
                labelId="evolucion-label"
                name="evolucion"
                value={evolucion}
                label="Evolucion"
                onChange={(event) => setEvolucion(event.target.value)}
              >
                <MenuItem value={"Normal"}>Normal</MenuItem>
                <MenuItem value={"Patologico"}>Patologico</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="alimentacion-label">Alimentacion</InputLabel>
              <Select
                id="alimentacion"
                labelId="alimentacion-label"
                name="alimentacion"
                value={alimentacion}
                label="Alimentacion"
                onChange={(event) => setAlimentacion(event.target.value)}
              >
                <MenuItem value={"Materna"}>Materna</MenuItem>
                <MenuItem value={"Formula"}>Formula</MenuItem>
              </Select>
            </FormControl>

            <TextField
              id="comentarios"
              name="comentarios"
              label="Comentarios"
              variant="filled"
              value={comentarios}
              onChange={(event) => setComentarios(event.target.value)}
            />
          </div>
          <div className="text-center p-4">
            <Button onClick={onSubmitEmb}>Aceptar</Button>
          </div>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
