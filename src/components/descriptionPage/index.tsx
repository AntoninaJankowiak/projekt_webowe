import React from "react"
import SideNav, {NavItems}  from "../sidenav"
import Container from "../Container"
import './style.scss'
interface pageItems{
    mainTitle: string,
    shortDescription: string,
    sidenav: NavItems,
    longDescriptionTitle?: string,
    longDescription?: string[]
}


export default function DescriptionPage({mainTitle, shortDescription, longDescription, longDescriptionTitle, sidenav}: pageItems){
    return(
        <Container classname="mainDescriptionPage">
            <h1 className={"mainTitle"}>{mainTitle}</h1>
            <div className={"descriptionDiv"}>
                <p className={"shortDescription"}>{shortDescription}</p>
            </div>
            <Container classname="descriptionPage">
                {sidenav && <SideNav navItems={sidenav}/>}
                {longDescription && longDescriptionTitle && (
                <Container classname={"longDescriptionContainer"}>
                    <h2 className={"longDescTitle"}>{longDescriptionTitle}</h2>
                    <div className={"longDescription"}>
                        {longDescription.map((paragraph, index)=>(
                            <p key={index} className={"longDescParagraph"}>{paragraph}</p>
                        ))}
                    </div>
                </Container>
                    )}
            </Container>
        </Container>

    )
}
//container descriptionPage -> display flex