import * as React from "react";
import "./App.css";
import CarouselView from "./components/Carousel";
import NewPatient from "./components/NewPatient";
import PatientHistory from "./components/PatientHistory";
import NewStudy from "./components/NewStudy";
import { Calendar } from "./components/Calendar";
import WebcamCapture from "./components/Camara";
import SelectImg from "./components/SelectImg";
import NewPatientOption from "./components/NewPatientOption";
import NewStudyOption from "./components/NewStudyOption";
import SearchPatient from "./components/SearchPatient";
import BasicStudyPrint from "./components/BasicStudyPrint";
import StudyPrint from "./components/StudyPrint";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import PrinterContextProvider from "./contexts/printerContextProvider";
import CustomReport from "./components/CustomReport";
import SearchPatientHistory from "./components/SearchPatientHistory";
import ListHistoryStudy from "./components/ListHistoryStudy";
import StudyPrintHistory from "./components/StudyPrintHistory";
import NewAppointment from "./components/NewAppointment";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <CarouselView />,
        },
        {
          path: "newpatient",
          element: <NewPatient />,
        },
        {
          path: "patientHistory",
          element: <PatientHistory />,
        },
        {
          path: "newStudy",
          element: <NewStudy />,
        },
        {
          path: "calendar",
          element: <Calendar />,
        },
        {
          path: "camara",
          element: <WebcamCapture />,
        },
        {
          path: "selectImg",
          element: <SelectImg />,
        },
        {
          path: "newPatientOption",
          element: <NewPatientOption />,
        },
        {
          path: "newStudyOption",
          element: <NewStudyOption />,
        },
        {
          path: "searchPatient",
          element: <SearchPatient />,
        },
        {
          path: "basicStudyPrint",
          element: <BasicStudyPrint />,
        },
        {
          path: "studyPrint",
          element: <StudyPrint />,
        },
        {
          path: "customReport",
          element: <CustomReport />,
        },
        {
          path: "searchPatientHistory",
          element: <SearchPatientHistory />,
        },
        {
          path: "listHistoryStudy",
          element: <ListHistoryStudy />,
        },
        {
          path: "studyPrintHistory",
          element: <StudyPrintHistory />,
        },
        {
          path: "newAppointment",
          element: <NewAppointment />,        
        }
      ],
    },
  ]);

  return (
    <React.Fragment>
      <PrinterContextProvider>
        <RouterProvider router={router} />
      </PrinterContextProvider>
    </React.Fragment>
  );
}

export default App;
