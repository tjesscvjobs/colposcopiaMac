import * as React from "react";
import { Outlet } from "react-router-dom";
import Nav from './components/Nav'
import { PrinterContext } from "./contexts/printerContext";

export default function Layout() {
    const printerContext = React.useContext(PrinterContext);

    return (
        <React.Fragment>
            {printerContext.showNavBar && (
                <Nav/>
            )}
            <Outlet/>
        </React.Fragment>
    );
}