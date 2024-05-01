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
//TODO: change the description, it's 100% stolen now, just a placeholder
const list: ListItems = {
    items: [
            {item: "We added bugs ", linkText: " see it here", linkHref:"https://www.youtube.com/watch?v=9d4ui9q7eDM"},
            {item: "You can glitch now"}
    ],
    type: 'circle' //circle/disc/none/square
}


export default function Home (){
    return (
       <Container classname={"mainDiv"}>
           <Header></Header>
           <NavBar></NavBar>
           <Container classname={"main"}>
               {/* <Article listItems={list} date={'2005-04-03'} introPg={"Yeahh pope died"} mainPg={"because of this event we:"} newsTitle={"Polish pope died of yellowness"} newsCategory={"Pokemon Scarlet and Violet"} videoLink={"https://www.youtube.com/watch?v=oV3ACc9DnJ0"}/> */}
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
        {pokedexId: 1, id: 6},
        {pokedexId: 2, id: 26 }
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
        {typeAttacking: "Normal", AtMulti: 2, DefMulti: 2},
        {typeAttacking: "Fire", AtMulti: 0.5, DefMulti: 0.5},
        {typeAttacking: "Water", AtMulti: 0.5, DefMulti: 2},
        {typeAttacking: "Sample", AtMulti: 2, DefMulti: 1},
        {typeAttacking: "Sample", AtMulti: 2, DefMulti: 1},
        {typeAttacking: "Sample", AtMulti: 2, DefMulti: 1},
        {typeAttacking: "Sample", AtMulti: 2, DefMulti: 1},
        {typeAttacking: "Sample", AtMulti: 2, DefMulti: 1},
        {typeAttacking: "Sample", AtMulti: 2, DefMulti: 1},
        {typeAttacking: "Sample", AtMulti: 2, DefMulti: 1},
        {typeAttacking: "Sample", AtMulti: 4, DefMulti: 1},
        {typeAttacking: "Sample", AtMulti: 2, DefMulti: 1},
        {typeAttacking: "Sample", AtMulti: 2, DefMulti: 1},
        {typeAttacking: "Sample", AtMulti: 0.25, DefMulti: 1},
        {typeAttacking: "Sample", AtMulti: 2, DefMulti: 1},
        {typeAttacking: "Sample", AtMulti: 4, DefMulti: 1},
        {typeAttacking: "Sample", AtMulti: 0.5, DefMulti: 1},
        {typeAttacking: "Sample", AtMulti: 4, DefMulti: 1},
    ],
    entries: [
        {entry: "Spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally.", games: ["Red, Blue"]},
        {entry: "Its wings can carry this Pokémon close to an altitude of 4,600 feet. It blows out fire at very high temperatures.", games: ["Yellow"] }
    ],
    sprites: [
        {gen: 1, normal: "https://img.pokemondb.net/sprites/red-blue/normal/charizard.png"}
    ],
    locations: [
        {games: ["Red, Blue"],
        location: [
            {region: "Kanto", locationName: "Route 3"},
            {region: "Kanto", locationName: "Cerulean Cave"}
        ]},
        {games: ["Yellow"],
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
