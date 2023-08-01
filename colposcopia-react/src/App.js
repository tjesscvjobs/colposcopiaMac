import * as React from 'react'
import './App.css';
import  CarouselView  from './components/Carousel';
import NewPatient from './components/NewPatient';
import PatientHistory from './components/PatientHistory';
import NewStudy from './components/NewStudy';
import { Calendar } from './components/Calendar';
import WebcamCapture from './components/Camara';
import SelectImg from './components/SelectImg';
import NewPatientOption from './components/NewPatientOption';
import NewStudyOption from './components/NewStudyOption';
import SearchPatient from './components/SearchPatient';
import BasicStudyPrint from './components/BasicStudyPrint';
import RenderBasicStudy from './components/RenderBasicStudy';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';

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
          element: <NewPatientOption />
        },
        {
          path: "newStudyOption",
          element: <NewStudyOption />
        },
        {
          path: "searchPatient",
          element: <SearchPatient />
        },
        {
          path: "basicStudyPrint",
          element: <RenderBasicStudy />
        }
      ]
    },
  ]);

  return ( 
    <React.Fragment>
      <RouterProvider router={router} />
    </React.Fragment>
  );
}

export default App;
