import React from "react"
import './style.scss'
import Container from "../Container"

export default function GenNav({urlBase}:{urlBase:string}){
    return(
        <Container classname={"nav2Div"}>
            <p>Jump to</p>
            <ul className={"genNavList"}>
                {[...Array(9)].map((_, i) => (
                    <li key={i} className={"nav2Item"}>
                        <a href={urlBase+"#gen"+(i+1)}>Gen {i + 1}</a>
                    </li>
                ))}
            </ul>
        </Container>
    )
}

export function UniversalNav({urlBase, elements}:{urlBase:string, elements:{value:string, linkEnd:string}[]}){
    return(
        <Container classname={"nav2Div"}>
            <p>Jump to</p>
            <ul className={"genNavList"}>
                {elements.map((element, i) => (
                    <li key={i} className={"nav2Item"}>
                        <a href={urlBase+element.linkEnd}>{element.value}</a>
                    </li>
                ))}
            </ul>
        </Container>
    )
}


//ready?