import * as React from "react";
import {
  Paper,
  Button,
  Container,
  CssBaseline,
  TextField,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const { ipcRenderer } = window.require("electron");

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchPatientHistory() {
  const navigate = useNavigate();

  const [name, setName] = React.useState("");
  const [patients, setPatients] = React.useState([]);

  const onSubmit = (event) => {
    event.preventDefault();
    ipcRenderer.send("get_list_name:submit", name);
    //ipcRenderer.removeAllListeners("save_patient:result");
    ipcRenderer.removeAllListeners('get_list_name:result');
    ipcRenderer.on("get_list_name:result", (event, result) => {
      //localStorage.setItem('patient', JSON.stringify(result));
      //navigate("/newPatientOption")
      setPatients(result);
    });
  };

  const selecPatient = (patient) => {
      localStorage.setItem('patient', JSON.stringify(patient));
      navigate("/listHistoryStudy")
  }

  React.useEffect(() => {
    localStorage.clear()
  }, []);

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
                    <h2 className="text-blue-400">Buscar Paciente</h2>
                  </div>
                </div>
              </div>
              <div className="container sub-container-narrow p-8">
                <form onSubmit={onSubmit} id="new_patient">
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  border-b border-gray-400">
                      <Search>
                        <SearchIconWrapper>
                          <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                          placeholder="Buscar…"
                          inputProps={{ "aria-label": "search" }}
                          onChange={(n) => setName(n.target.value)}
                        />
                      </Search>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                        <h3>Pacientes</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 hover:bg-sky-300 p-2">
                                <div>
                                    <strong>Nombre</strong>
                                </div>
                                <div>
                                    <strong>Fecha de nacimiento</strong>
                                </div>
                            </div>
                      {
                        patients.map((patient, i) => {
                            return (
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 hover:bg-sky-300 p-2" key={`${name}-${i}`} onClick={() => selecPatient(patient)}>
                                <div>
                                    <strong>{patient.nombre}</strong>
                                </div>
                                <div>
                                    <p>{patient.fecha_nacimiento}</p>
                                </div>
                            </div>

                        )})
                      }
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
