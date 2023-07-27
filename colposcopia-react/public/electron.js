const path = require("path");

const { app, BrowserWindow } = require("electron");
const ipcMain = require("electron").ipcMain;
const isDev = require("electron-is-dev");
const fs = require("fs");

//import { , PrismaClient } from "@prisma/client";
const { Prisma, PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }

  //electron IPCrender

  /**
   * Save new patient
   * @global function
   * @param {object} patient - info data patient
   * */
  ipcMain.on("save_patient:submit", async (event, patient) => {
    const result = await prisma.patient.create({
      data: patient,
    });
    win.webContents.send("save_patient:result", result);
  });

  /**
   * Save clinic history patient
   * @global function
   * @param {object} patient - patient history clinic
   * */
  ipcMain.on("save_history:submit", async (event, newPatient) => {
    const { patient, pregnancies, ...history } = newPatient;
    var pregnanciesResult = [];

    pregnancies.forEach(async (element) => {
      pregnanciesResult.push(
        await prisma.regnancies.create({
          data: element,
        })
      );
    });
    const result = await prisma.PatientHistory.create({
      data: {
        patient: patient,
        ...history,
      },
    });
    win.webContents.send("save_history:result", result);
  });

  /**
   * Save images
   * @global function
   * @param {object} blob - file to save
   * @param {number} desp - number images
   * */
  ipcMain.on("image:submit", (event, blob, desp) => {
    if (!fs.existsSync(__dirname + "/studies/temp")) {
      fs.mkdirSync(__dirname + "/studies/temp", { recursive: true });
    }
    /*if (!fs.existsSync(__dirname + "/studies/temp")) {
      fs.mkdir(__dirname + "/studies/temp", (err, p) => {
        if (err) throw err;
      });
    }*/

    for (let i = 0; i < desp; i++) {
      const b = blob[i].split(",");
      fs.writeFile(
        __dirname + `/studies/temp/${i}.jpeg`,
        b[1],
        "base64",
        function (err) {
          if (err) throw err;
        }
      );
    }

    win.webContents.send("image:result", "Imagenes Guardadas");
  });

  /**
   * Retrieve patient like name
   * @global function
   * @param {string} patient - name of patient
   * */
  ipcMain.on("get_list_name:submit", (event, patient) => {
    database.all(
      `SELECT * FROM patients WHERE UPPER(name) LIKE UPPER('%${patient}%')`,
      (err, rows) => {
        if (err) {
        }

        win.webContents.send("get_list_name:result", rows);
      }
    );
  });

  /**
   * Save image in study
   * @global function
   * @param {array} blob - file to save
   * @param {int} id - patientID
   * */
  ipcMain.on("rename_image:submit", async (event, blobs, desp, id) => {
    let today = new Date();
    let study = {
      fecha: today,
      patientId: id,
    };
    const result = await prisma.study.create({
      data: study,
    });
    if (!fs.existsSync(__dirname + "/studies/patient")) {
      fs.mkdirSync(__dirname + "/studies/patient", { recursive: true });
    }
    for (let i = 0; i < desp; i++) {
      if (
        fs.renameSync(
          __dirname + `/studies/temp/${blobs[i]}.jpeg`,
          __dirname + `/studies/patient/${result.id}-${blobs[i]}.jpeg`
        )
      ) {
      }
    }

    fs.readdir(__dirname + "/studies/temp")
      .then((files) => {
        const unlinkPromises = files.map((file) => {
          const filePath = path.join(__dirname + "/studies/temp", file);
          return fs.unlink(filePath);
        });

        return Promise.all(unlinkPromises);
      })
      .catch((err) => {
        console.error(
          `Something wrong happened removing files of ${
            __dirname + "/studies/temp"
          }`
        );
      });

    win.webContents.send("rename_image:result", result);
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
