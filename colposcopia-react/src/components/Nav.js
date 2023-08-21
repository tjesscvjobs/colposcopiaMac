import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { useNavigate } from "react-router-dom";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Nav() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const open1 = Boolean(anchorEl1);

  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const open2 = Boolean(anchorEl2);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Colposcopia
          </Typography>
          <nav>
            <Link>
              <Button
                id="patient"
                aria-controls={open ? "patient-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                Paciente
              </Button>
              <Menu
                id="patient-menu"
                aria-labelledby="patient"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    navigate("/newpatient");
                    localStorage.clear();
                  }}
                >
                  Nuevo
                </MenuItem>
                <MenuItem onClick={handleClose}>Consulta Actual</MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    navigate("/searchPatientHistory");
                  }}
                >
                  Seguimiento
                </MenuItem>
              </Menu>
            </Link>
            <Link>
              <Button
                id="study-button"
                aria-controls={open1 ? "study-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open1 ? "true" : undefined}
                onClick={handleClick1}
              >
                Estudio
              </Button>
              <Menu
                id="study-menu"
                aria-labelledby="study-button"
                anchorEl={anchorEl1}
                open={open1}
                onClose={handleClose1}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleClose1();
                    navigate("/searchPatient");
                  }}
                >
                  Nuevo
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose1();
                    navigate("/customReport");
                  }}
                >
                  Personalizar Reporte
                </MenuItem>
              </Menu>
            </Link>
            <Link>
              <Button
                id="appointment-button"
                aria-controls={open2 ? "appointment-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open2 ? "true" : undefined}
                onClick={handleClick2}
              >
                Agenda
              </Button>
              <Menu
                id="appointment-menu"
                aria-labelledby="appointment-button"
                anchorEl={anchorEl2}
                open={open2}
                onClose={handleClose2}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem onClick={() => {handleClose2(); navigate("/calendar")}}>Consultar</MenuItem>
                <MenuItem onClick={() => {handleClose2(); navigate("/newAppointment")}}>Nueva Cita</MenuItem>
              </Menu>
            </Link>
          </nav>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
