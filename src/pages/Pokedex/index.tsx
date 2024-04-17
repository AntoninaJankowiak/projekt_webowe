import React from 'react';
import Header from '../../components/header/index.tsx'
import Container from "../../components/Container";
import NavBar from "../../components/navbar"
import Footer from "../../components/footer"
import {NavItems} from "../../components/sidenav"
import DescriptionPage from "../../components/descriptionPage"
import * as string_decoder from "string_decoder"

const navData: NavItems = {
    items: [
        {
            title: "Pokedex with stats", links:
                [
                    { name: "All pokemon", href: "/pokedex/all", description:"The master list", descriptionType:"linkDescriptionBelow", bold:false}
                ],
        },
        {
            description: "Each game has a native Pokédex with the Pokémon from that region. The national dex lists all Pokémon in their original order. (currently only gen 1 and 2)",
            title: "Native Pokedexes", links:
            [
                {name: "National dex", href: "/pokedex/all", description: "(Generation 9)", bold: true, descriptionType: "linkDescriptionSide"},
                {name: "Gold, Silver & Crystal", href: "/pokedex/johto", description: "(Johto)", descriptionType: "linkDescriptionSide"},
                {name: "Red, Blue & Yellow", href: "/pokedex/kanto", description: "(Kanto)", descriptionType: "linkDescriptionSide"}
            ]
        },
        {
            title: "Other Pokedexes", links:
            [
                {name: "Shinydex", href: "/pokedex/shiny", description: "List of Pokemon with shiny sprites", bold: false, descriptionType: "linkDescriptionBelow"},
                {name: "Shinydex", href: "/pokedex/size", description: "Pokemon listed by height and weight", bold: false, descriptionType: "linkDescriptionBelow"}
            ]

        }
    ]
}
const shortDesc: string ="The Pokedex section has entries for all Pokemon from the game series. On the main list pages you can see each Pokémon and its type. Click a Pokemon's name to see a detailed page with Pokedex data, evolutions, moves , descriptions from games, sprites, and more.Website in development, only gen 1 has full data and gen 2 has most data, pokemon from later generation are incomplete."

const longDescs: string[] = [
    "Each Pokémon has different abilities. HP, or Hit Points, shows how much life a Pokémon has. When HP reaches zero, the Pokémon faints and can't fight anymore (but can still use Hidden Machines). Speed decides which Pokémon goes first in a battle, which is important for long battles.",
    "Attack and Special Attack show how strong a Pokémon's moves are; the higher these stats, the more damage they deal. Attack is for physical moves, while Special Attack is for special moves.",
    "Defense and Special Defense show how well a Pokémon can take hits; higher stats mean less damage taken when attacked. Defense is for physical moves, and Special Defense is for special moves."
]

export default function Pokedex (){
    return (
        <Container>
            <Header></Header>
            <NavBar></NavBar>
            <Container classname="main">
                <DescriptionPage mainTitle={"Pokedex"} shortDescription={shortDesc} sidenav={navData} longDescription={longDescs} longDescriptionTitle={"About pokedex"}/>
            </Container>
            <Footer/>
        </Container>
    )
}