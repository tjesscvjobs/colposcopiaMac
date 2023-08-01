import React from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';
import MyDocument from './BasicStudyPrint';

export default function RenderBasicStudy () {(
  <PDFViewer>
    <MyDocument />
  </PDFViewer>
)};
