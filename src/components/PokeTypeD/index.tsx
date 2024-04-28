import React from "react"
import {isTypeValid, pokemonTypesColors} from "../PokeTypeA"
import './style.scss'

export default function PokeTypeD({type}:{type:string}){
    if(isTypeValid(type)){
        return (
            //bg color not in css because I don't want to make 18 classes just for different colors
            <div className={"pokeTypeDiv"} style={{backgroundColor: pokemonTypesColors.find(pokemonType => pokemonType.type === type).color}} >
                <a href={"/type/"+type}>{type}</a>
            </div>
        )
    }
    return null
}

export function PokeTypeDAll(){
     return (
         <>
             {pokemonTypesColors.map((type, index) => (
                 <td className={"pokeTypeDiv pokeTypeDivSmall"} style={{backgroundColor:type.color}} >
                     <a href={"/type/"+type.type}>{(type.type).slice(0,3).toUpperCase()}</a>
                 </td>
             ))}
         </>
     )
}

