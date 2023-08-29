const path = require("path");
const { app, BrowserWindow } = require("electron");
const ipcMain = require("electron").ipcMain;
const isDev = require("electron-is-dev");
const fs = require("fs");
const url = require("url");
const { join } = require('path');

//import { , PrismaClient } from "@prisma/client";
const { Prisma, PrismaClient } = require("@prisma/client");

const dbPath = isDev ? path.join(__dirname, '../prisma/dev.db') : path.join(app.getPath("userData"), "database.db")
const filePath = isDev ? path.join(__dirname, '/studies') : path.join(app.getPath("userData"), "/studies")

if (!fs.existsSync(filePath)) {
  fs.mkdirSync(filePath, { recursive: true });
}

if (!isDev) {
  try {
      // database file does not exist, need to create
      fs.copyFileSync(join(process.resourcesPath, 'prisma/dev.db'), dbPath, fs.constants.COPYFILE_EXCL)
      console.log("New database file created")
  } catch (err) {
      if (err.code != "EEXIST") {
          console.error(`Failed creating sqlite file.`, err)
      } else {
        
          console.log("Database file detected")
      }
  }
}

const prisma = new PrismaClient({
  datasources: {
      db: {
          url: `file:${dbPath}`,
      },
  },
});

//const prisma = new PrismaClient();

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
  /*const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "./../build/index.html"),
      protocol: "file:",
      slashes: true,
    });*/
    const startUrl =
    url.format({
      pathname: path.join(__dirname, "./../build/index.html"),
      protocol: "file:",
      slashes: true,
    });
    win.loadURL(startUrl);
      

  /*win.loadURL(
    isDev
      ? "http://localhost:3000"
      //: `file://${path.join(__dirname, "../build/index.html")}`
      : `app://../build/index.html`
  );*/
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }

  //electron IPCrender

  /**
   * Save new patient
   * @global function
   * */
  ipcMain.on("get_filepath:submit", async (event) => {
    console.log("filePath", filePath);
    win.webContents.send("get_filepath:result", filePath);
  });

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
        await prisma.pregnancies.create({
          data: element,
        })
      );
    });
    const result = await prisma.patientHistory.create({
      data: {
        patientId: patient,
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
    /*if (!fs.existsSync(__dirname + "/studies/temp")) {
      fs.mkdirSync(__dirname + "/studies/temp", { recursive: true });
    }*/
    let pathTemp =  path.join(filePath,  "/temp")
    console.log(pathTemp);
    if (!fs.existsSync(pathTemp)) {
      fs.mkdir(pathTemp, {recursive: true}, (err, p) => {
        if (err) throw err;
        console.log("p", p);
      });
    }

    for (let i = 0; i < desp; i++) {
      const b = blob[i].split(",");
      fs.writeFile(
        pathTemp + `/${i}.jpeg`,
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
  ipcMain.on("get_list_name:submit", async (event, patient) => {
    let patients = await prisma.patient.findMany({
      where: {
        nombre: { contains: patient },
      },
    });
    win.webContents.send("get_list_name:result", patients);
  });

  /**
   * Save image in study
   * @global function
   * @param {array} blob - file to save
   * @param {int} desp - number images
   * @param {int} id - patientID
   * */
  ipcMain.on("rename_image:submit", async (event, blobs, desp, id) => {
    let today = new Date();
    let study = {
      fecha: today,
      patientId: id,
      imagenes: desp,
    };
    const result = await prisma.study.create({
      data: study,
    });
    let pathStudy =  path.join(filePath,  "/patient")
    if (!fs.existsSync(pathStudy)) {
      fs.mkdirSync(pathStudy, { recursive: true });
    }
    for (let i = 0; i < desp; i++) {
      if (
        fs.renameSync(
          `${filePath}/temp/${blobs[i]}.jpeg`,
          `${filePath}/patient/${result.id}-${blobs[i]}.jpeg`
        )
      ) {
      }
    }

    if (fs.existsSync( `${filePath}/temp`)) {
      fs.readdirSync(`${filePath}/temp`).forEach(function (
        file,
        index
      ) {
        var currentPath = path.join( `${filePath}/temp`, file);
        if (fs.lstatSync(currentPath).isDirectory()) {
          deleteFolderRecursively(currentPath);
        } else {
          fs.unlinkSync(currentPath); // delete file
        }
      });
      fs.rmdirSync(`${filePath}/temp`); // delete folder/directories
    }

    win.webContents.send("rename_image:result", result);
  });

  /**
   * Update study
   * @global function
   * @param {object} id - info data patient
   * @param {object} study - info data study
   * */
  ipcMain.on("update_study:submit", async (event, id, study) => {
    const result = await prisma.study.update({
      where: {
        id: id,
      },
      data: {
        ...study,
      },
    });
    win.webContents.send("update_study:result", result);
  });

  /**
   * Update clinic
   * @global function
   * @param {object} clinic - info data clinic
   * */
  ipcMain.on("update_clinic:submit", async (event, clinic, file = null) => {
    var result = await prisma.clinic.findUnique({
      where: {
        id: 1,
      },
    });

    if (result == null) {
      result = await prisma.clinic.create({
        data: clinic,
      });
    } else {
      result = await prisma.clinic.update({
        where: {
          id: 1,
        },
        data: {
          ...clinic,
        },
      });
    }

    if (file != null) {
      const b = file.split(",");
      fs.writeFile(
        __dirname + `/img/logo-medical_1.png`,
        b[1],
        "base64",
        function (err) {
          if (err) throw err;
        }
      );
    }

    win.webContents.send("update_clinic:result", result);
  });

  /**
   * get clinic
   * @global function
   * */
  ipcMain.on("get_clinic:submit", async (event) => {
    const result = await prisma.clinic.findUnique({
      where: {
        id: 1,
      },
    });

    win.webContents.send("get_clinic:result", result);
  });

  /**
   * get studies by patient id
   * @global function
   * @param {int} id - patient id
   * */
  ipcMain.on("get_studies:submit", async (event, id) => {
    const result = await prisma.study.findMany({
      where: {
        patientId: id,
      },
    });

    win.webContents.send("get_studies:result", result);
  });

  /**
   * get clinic history by patient id
   * @global function
   * @param {int} id - patient id
   * */
  ipcMain.on("get_medical_history:submit", async (event, id) => {
    console.log("medical");
    const history = await prisma.patientHistory.findMany({
      where: {
        patientId: id,
      },
    });
    const pregnancies = await prisma.pregnancies.findMany({
      where: {
        patientId: id,
      },
    });
    win.webContents.send("get_medical_history:result", {
      history: history[0],
      pregnancies: pregnancies,
    });
  });
  /**
   * get studies by patient id
   * @global function
   * */
  ipcMain.on("get_events:submit", async (event) => {
    const result = await prisma.schedule.findMany({});

    win.webContents.send("get_events:result", result);
  });
  /**
   * create appointment
   * @global function
   * @param {object} appointment - info data appointment
   * */
  ipcMain.on("create_appointment:submit", async (event, appointment) => {
    const result = await prisma.schedule.create({
      data: appointment,
    });

    win.webContents.send("create_appointment:result", result);
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
