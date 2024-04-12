import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Navbar from './components/Navbar';
//import Footer from './components/Footer';
//import AboutUs from './pages/AboutUs';
//import Clicker from './pages/Clicker';
//import Contact from './pages/Contact';
import Home from './pages/Home';
import React from "react";

const routes = [
    { path: '/', element: <Home /> }//,
    //{ path: '/aboutus', element: <AboutUs /> },
    //{ path: '/clicker', element: <Clicker /> },
    //{ path: '/contact', element: <Contact /> }
];

export default function App() {
    return (
        <Router>
            <div>
                <Routes>
                    {routes.map(({ path, element }) => (
                        <Route key={path} path={path} element={element} />
                    ))}
                </Routes>
            </div>
        </Router>
    );
}
//<Navbar routes={routes.map(route => ({ path: route.path, label: route.element.type.name }))}/>