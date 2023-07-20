import * as React from "react";
import { Outlet } from "react-router-dom";
import Nav from './components/Nav'

export default function Layout() {
    return (
        <React.Fragment>
            <Nav/>
            <Outlet/>
        </React.Fragment>
    );
}