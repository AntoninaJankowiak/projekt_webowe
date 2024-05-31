import React from 'react';
import Header from '../../components/header/index.tsx'
import Container from "../../components/Container";
import NavBar from "../../components/navbar"
import Footer from "../../components/footer"
import DescriptionPage from "../../components/descriptionPage"
import Video from "../../components/Video"
import List, {ListItems} from "../../components/List"
import Article from "../../components/Article"
import PokemonPage, {PokeData} from "../../components/PokemonPage"

const shortDesc="Welcome! We believe in making Pokémon information as clear and easy to digest as possible...change this later it's stolen"
export default function HardcodedPokemon (){
    return (
       <Container classname={"mainDiv"}>
           <Header></Header>
           <NavBar></NavBar>
           <Container classname={"main"}>
               <PokemonPage pokeData={Charizard}/>
           </Container>
           <Footer/>
       </Container>
    )
}

//just example data
const Charizard: PokeData = {
    pokemonId: 6,
    name: "Charizard",
    description: <p>A fiery-winged Pokémon that can fly through the sky at Mach speeds.</p>,
    bigImage: "https://img.pokemondb.net/artwork/large/charizard.jpg",
    localId: [
        {pokedex: "red/blue/yellow", id: 6},
        {pokedex: "gold/silver/crystal", id: 26 }
    ],
    type1: "Fire",
    type2: "Flying",
    species: "Flame Pokémon",
    heightM: 1.7,
    weightKg: 90.5,
    maleRatio: 87.5,
    femaleRatio: 12.5,
    baseFriendship: 70,
    typeEffectiveness: [
        {typeEnemy: "Normal", AtMulti: 2, DefMulti: 2},
        {typeEnemy: "Fire", AtMulti: 0.5, DefMulti: 0.5},
        {typeEnemy: "Water", AtMulti: 0.5, DefMulti: 2},
        {typeEnemy: "Sample", AtMulti: 2, DefMulti: 1},
        {typeEnemy: "Sample", AtMulti: 2, DefMulti: 1},
        {typeEnemy: "Sample", AtMulti: 2, DefMulti: 1},
        {typeEnemy: "Sample", AtMulti: 2, DefMulti: 1},
        {typeEnemy: "Sample", AtMulti: 2, DefMulti: 1},
        {typeEnemy: "Sample", AtMulti: 2, DefMulti: 1},
        {typeEnemy: "Sample", AtMulti: 2, DefMulti: 1},
        {typeEnemy: "Sample", AtMulti: 4, DefMulti: 1},
        {typeEnemy: "Sample", AtMulti: 2, DefMulti: 1},
        {typeEnemy: "Sample", AtMulti: 2, DefMulti: 1},
        {typeEnemy: "Sample", AtMulti: 0.25, DefMulti: 1},
        {typeEnemy: "Sample", AtMulti: 2, DefMulti: 1},
        {typeEnemy: "Sample", AtMulti: 4, DefMulti: 1},
        {typeEnemy: "Sample", AtMulti: 0.5, DefMulti: 1},
        {typeEnemy: "Sample", AtMulti: 4, DefMulti: 1},
    ],
    entries: [
        {entry: "Spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally.", games: "Red, Blue"},
        {entry: "Its wings can carry this Pokémon close to an altitude of 4,600 feet. It blows out fire at very high temperatures.", games:"Yellow" }
    ],
    sprites: [
        {gen: 1, normal: "https://img.pokemondb.net/sprites/red-blue/normal/charizard.png"}
    ],
    locations: [
        {game: "Red, Blue",
        location: [
            {region: "Kanto", locationName: "Route 3"},
            {region: "Kanto", locationName: "Cerulean Cave"}
        ]},
        {game: "Yellow",
        location: [
            {locationName: "T"}
        ]}
    ],
    previousPoke: {
        id: 5,
        name: "Charmeleon"
    },
    nextPoke: {
        id: 7,
        name: "Squirtle"
    }
}

//<DescriptionPage mainTitle={"Pokémon Database - News & Updates"} shortDescription={shortDesc}/>


//<Video/> WORKS

/*const list: ListItems = {
    items: [
        {item: "We added bugs"},
        {item: "You can glitch now"}
    ]
}*/
//<List listItems={list}/> WORKS TOO
