import React from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';
import MyDocument from './BasicStudyPrint';

export default function RenderBasicStudy () {
    return (
    <React.Fragment>
        <h1>Test</h1>
        <PDFViewer>
            <MyDocument />
        </PDFViewer>
    </React.Fragment>
    )
};
