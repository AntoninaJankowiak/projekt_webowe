import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import React from "react";
import Pokedex from "./pages/Pokedex"
import axios from 'axios'
import PokemonPage from "./components/PokemonPage"
import HarcodedPokemon from "./pages/HarcodedPokemon"
import HardcodedArticle from "./pages/HardocedArticle"
import PokedexExample from "./pages/PokedexExample"
import ExampleDataTable from "./pages/ExampleDataTable"

const apiCall = () => {
    axios.get('http://localhost:5000').then((data) => {
        console.log(data)
    })
}

const routes = [
    { path: '/', element: <Home /> },
    { path: '/pokedex', element: <Pokedex /> },
    { path: '/pokedex/:name', element: <PokemonPage/> },
    {path: '/pokedex/pokemon', element: <HarcodedPokemon/>},
    {path: '/articles/article', element: <HardcodedArticle/>},
    {path: '/pokedex/example', element: <PokedexExample/>},
    {path: '/table', element: <ExampleDataTable/>},
]

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
    )
}
//<Navbar routes={routes.map(route => ({ path: route.path, label: route.element.type.name }))}/>