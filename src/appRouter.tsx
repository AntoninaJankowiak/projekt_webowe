import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "src/pages/ExampleDataTable";
import Pokedex from "./pages/Pokedex"

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pokedex" element={<Pokedex/>}/>
            </Routes>
        </Router>
    );
}

export default AppRouter;
