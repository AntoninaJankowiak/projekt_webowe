import React, {useState, useEffect} from "react";
import './style.scss'
import {Navbar, Nav, NavDropdown} from "react-bootstrap"
import icon_pokeball from "../../assets/icon_pokeball.png"
import icon_gear from "../../assets/icon_gear.png"
import Container from "../Container";

export default function NavBar() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(()=>{
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener("resize", handleResize)

        return()=>{
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    const handleTitle = (title,shortTitle) =>{
        return windowWidth < 670 ? shortTitle : title
    }

    const menuItems = [
        {
            image: {icon_pokeball},
            title: "Pokemon data",
            shortTitle: "Data",
            items: [
                { text: "Pokedex", href: "#", type:"link"},
                { text: "Moves", href: "#", type:"link" },
                { text: "Type chart", href: "#", type:"link" },
                { text: "Abilities", href: "#", type:"link" },
                { text: "Items", href: "#", type:"link" },
                { text: "Evolution chains", href: "#", type:"link" },
                { text: "Pokemon locations", href: "#", type:"link" },
                { text: "Sprite gallery", href: "#", type:"link" },
                { text: "Quick links", href:"#", type:"text"} ,
                { text: "National pokedex", href: "#", type:"link" }
            ]

        },
        {
            image: {icon_gear},
            title: "Game mechanics",
            shortTitle: "Mechanics",
            items: [
                {text: "Breeding & egg groups", href: '#', type:"link"},
                {text: "Move tutors", href: '#', type:"link"},
                {text: "Dual type charts", href: '#', type:"link"},
                {text: "Effort values (EVs)", href: '#', type:"link"},
                {text: "Natures", href: '#', type:"link"},
                {text: "IVs/Personality", href: '#', type:"link"},
                {text: "Moveset searcher", href: '#', type:"link"},
                {text: "Type coverage calculator", href: '#', type:"link"},
                {text: "Text list generator", href: '#', type:"link"}
            ]
        }
    ]
    console.log({icon_gear})
    return (
        <Navbar expand={false}>
            <Nav id={"navbar"}>
                {menuItems.map((menu,index)=>(
                    <Container key={index}>
                        <img src={Object.values(menu.image)[0]} className="dropMenuIcon"/>
                        <NavDropdown key={index} title={handleTitle(menu.title, menu.shortTitle)} className={"hoverDropdown"} renderMenuOnMount={true}>
                            {menu.items.map((item,idx)=>(
                                <NavDropdown.Item key={idx} href={item.href} className={item.type}>
                                    {item.text}
                                </NavDropdown.Item>
                             ))}
                        </NavDropdown>
                    </Container>
                ))}
            </Nav>
        </Navbar>
    )

}

//{Object.values(menu.image)[0]}