import React, {useState} from "react"
import './style.scss'
import Container from "../Container"
import {fixNamesFromDb} from "../../../helpers/functions.js"
import PokeTypeA from "../PokeTypeA"


export function Capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}

export function PokeInfoCardSh({img1,imgSh, pokeId, name, type1, type2}:{img1:string, imgSh:string, pokeId:number, name:string, type1:string, type2?:string}) {

    const [img,setImg]=useState(imgSh)
    const hMsEnter=()=>{setImg(img1)}
    const hMsLeave=()=>{setImg(imgSh)}

    return (
        <Container classname={"pokeDataS"}>
            <img src={img} className={"pokeListPokeImgSh"} alt={fixNamesFromDb(name)+"sprite shiny"} onMouseEnter={hMsEnter} onMouseLeave={hMsLeave}/>
            <h6 className={"pokeListPokeId"}>#{pokeId.toString().padStart(3, '0')}</h6>
            <a className={"pokeListPageLink"} href={"/pokedex/"+fixNamesFromDb(name)}> {name}</a>

            <PokeTypeA type={Capitalize(type1)}/>
            {type2? " · "+<PokeTypeA type={Capitalize(type2)}/>: <></>}
        </Container>
    )
}

export default function PokeInfoCard({img, pokeId, name, type1, type2}:{img:string, pokeId:number, name:string, type1:string, type2?:string}) {
    return (
     <Container classname={"pokeDataS"}>
        <img src={img} className={"pokeListPokeImg"} alt={fixNamesFromDb(name)+"sprite"}/>
         <h6 className={"pokeListPokeId"}>#{pokeId.toString().padStart(3, '0')}</h6>
         <a className={"pokeListPageLink"} href={"/pokedex/"+fixNamesFromDb(name)}>{name}</a>
         <PokeTypeA type={Capitalize(type1)}/>
         {type2? " · "+<PokeTypeA type={Capitalize(type2)}/>: <></>}
     </Container>
    )
}
//TODO: these are only pokemon, make another component for pokedex list page