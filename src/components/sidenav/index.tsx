import React from "react"
import Container from "../Container"
import './style.scss'
export interface NavItems{
    items: {
        title: string,
        description?: string,
        links: {
            name: string
            href: string
            bold?: boolean
            description?: string
            descriptionType?: string
        }[]
    }[]
}


export default function SideNav({navItems}:{navItems: NavItems}){
    return(
        <div className={"sidenav"}>
            {navItems.items.map((item,index)=>(
                <div key={index}>
                    <h2 className={"sideNavTitle"}>{item.title}</h2>
                    <p className={"sectionDescription"}>{item.description}</p>
                    <ul>
                        {item.links.map((link,linkId)=>(
                            <li className={"sideNavLI"}>
                                <a href={link.href} className={"menuLink"}>{link.name}</a>
                                {link.description && <p className={(link.descriptionType || 'linkDescriptionSide') + (link.bold?' textBold': '')}>{link.description}</p>}
                            </li>
                        ))}
                    </ul>

                </div>
            ))}
        </div>
    )
}