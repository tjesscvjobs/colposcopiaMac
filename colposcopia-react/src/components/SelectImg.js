import React from "react";
import { Paper, Button, Container, CssBaseline } from "@mui/material";

const { ipcRenderer } = window.require("electron");

export default function SelectImg() {
  const getImgs = () => {
    let imgs = [];
    const maxImg = localStorage.getItem("img");

    for (let i = 0; i < maxImg; i++) imgs.push(`../studies/temp/${i}.jpeg`);
    return imgs;
  };

  const onSubmit = () => {
    //console.log(data);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Paper>
          <div className="flex flex-col mt-12">
            <div className="rounded rounded-lg bg-slate-200 dark:bg-white/10 mb-7">
              <div className="container sub-container-narrow p-8 items-center">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getImgs().map((src, i) => (
                    <div key={i}>
                      <img
                        id={`photo${i}`}
                        alt="The screen capture will appear in this box."
                        src={src}
                      ></img>
                      <div className="text-center">
                        <Button>Agregar</Button>
                        <Button>Borrar</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <Button>Continuar</Button>
              </div>
            </div>
          </div>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
