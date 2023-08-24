import React from "react";
import { Paper, Button, Container, CssBaseline } from "@mui/material";
import { useNavigate } from "react-router-dom";

const { ipcRenderer } = window.require("electron");
var imgs = []
var selected = []


export default function SelectImg() {

  const navigate = useNavigate();
  const [isSelect, setIsSelect] = React.useState(Array(localStorage.getItem("img")).fill(false));

  const getImgs = () => {
    let imgs = [];
    const maxImg = localStorage.getItem("img");

    for (let i = 0; i < maxImg; i++) {
        imgs.push(`studies/temp/${i}.jpeg`);
        if (selected[i] === undefined)
            selected.push(false);
    }
    
    return imgs;
  };

  const onSubmit = () => {
     let patient = JSON.parse(localStorage.getItem("patient"));
     ipcRenderer.send("rename_image:submit", imgs, imgs.length, patient.id);
     ipcRenderer.on("rename_image:result", (event, result) => {
       localStorage.setItem('study', JSON.stringify(result));
       navigate("/newStudyOption");
     });
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
                    <div 
                    key={i}
                    style={{backgroundColor: isSelect[i] ? "#3fbbc0" : "#fff"}}
                    >
                    <img
                        id={`photo${i}`}
                        alt="The screen capture will appear in this box."
                        src={src}
                        className="m-auto"
                      ></img>
                      
                      <div className="text-center">
                        <Button onClick={() => {
                            setIsSelect(prev => {
                                let copy = [... prev];

                                copy[i] = !copy[i];
                                return copy;
                            })
                            imgs.push(i)
                        }} >Agregar</Button>
                        <Button onClick={() => {
                            setIsSelect(prev => {
                                let copy = [... prev];

                                copy[i] = !copy[i];
                                return copy;
                            })
                            imgs.pop(i)
                        }}>Borrar</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <Button onClick={onSubmit}>Continuar</Button>
              </div>
            </div>
          </div>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
