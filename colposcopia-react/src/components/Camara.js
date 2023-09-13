import React from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Button,
  Container,
  CssBaseline,
} from "@mui/material";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const { ipcRenderer } = window.require("electron");



var blops = [];

export default function WebcamCapture() {

  const navigate = useNavigate();
  const webcamRef = React.useRef(null);
  const imgRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState("");
  const [open, setOpen] = React.useState(true);
  

  const capture = React.useCallback(() => {
    const b64imageSrc = webcamRef.current.getScreenshot({ width: 320, height: 240 });
    blops.push(b64imageSrc)
    console.log(blops.length);
    setImgSrc(b64imageSrc);
  }, [webcamRef]);

  const onSubmit = () => {
    //console.log(data);
    console.log("submit",blops.length);
    ipcRenderer.send("image:submit", blops, blops.length);
    //ipcRenderer.removeAllListeners("save_patient:result");
    ipcRenderer.on("image:result", (event, result) => {
      localStorage.setItem('img', blops.length);
      navigate("/selectImg");
    });
  }

  React.useEffect(() => {
    localStorage.removeItem('img');
    blops = [];
   setTimeout(() => {
    setOpen(false);
   }, 3000);
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Paper>
          <div className="gap-4">
            <div className="p-2">
              <Webcam
                audio={false}
                height={720}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={1280}
                videoConstraints={videoConstraints}
              />
            </div>

            <div className="text-center p-2">
              <Button
                variant="outlined"
                onClick={capture}
                disabled={open}
              >
                Tomar imagen
              </Button>
            </div>
            <div className="text-center p-2">
              <Button
                variant="outlined"
                onClick={onSubmit}
              >
                Guardar Imagenes
              </Button>
            </div>

          {/*imgSrc !== "" && <img src={imgSrc} style={{ width: 320, height: 240 }} />*/}
          </div>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
