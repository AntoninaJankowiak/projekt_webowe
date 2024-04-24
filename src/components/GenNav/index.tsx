import React from "react"
import './style.scss'
import Container from "../Container"

export default function GenNav({urlBase}:{urlBase:string}){
    return(
        <Container classname={"genNavDiv"}>
            <p>Jump to</p>
            <ul className={"genNavList"}>
                {[...Array(9)].map((_, i) => (
                    <li key={i} className={"genNavItem"}>
                        <a href={urlBase+"#gen"+(i+1)}>Gen {i + 1}</a>
                    </li>
                ))}
            </ul>
        </Container>
    )
}

//ready?