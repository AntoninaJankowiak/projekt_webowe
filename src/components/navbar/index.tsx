import React, {useState, useEffect} from "react";
import './style.scss'
import {Navbar, Nav, NavDropdown} from "react-bootstrap"
import icon_pokeball from "../../assets/icon_pokeball.png"
import icon_gear from "../../assets/icon_gear.png"
import icon_games from "../../assets/icon_games.png"
//Todo: find and import forum and other icons
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
                {text: "Pokedex", href: "/pokedex", type:"link"},
                {text: "Moves", href: "/move", type:"link" },
                {text: "Type chart", href: "/type", type:"link" },
                {text: "Abilities", href: "/ability", type:"link" },
                {text: "Items", href: "/item", type:"link" },
                {text: "Evolution chains", href: "/evolution", type:"link" },
                {text: "Pokemon locations", href: "/location", type:"link" },
                {text: "Sprite gallery", href: "/sprites", type:"link" },
                {text: "Quick links", href:"#", type:"text"} ,
                {text: "National pokedex", href: "/pokedex/national", type:"link" }
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
                {text: "Useful tools", href:"#", type:"text"} ,
                {text: "Moveset searcher", href: '#', type:"link"},
                {text: "Type coverage calculator", href: '#', type:"link"},
                {text: "Text list generator", href: '#', type:"link"}
            ]
        },
        {
            image: {icon_games},
            title: "Pokemon games",
            shortTitle: "Games",
            items:[
                {text: "Gen 2", href: "#", type: "text"},
                {text: "Crystal", href: "#", type: "link"},
                {text: "Gold/Silver", href: "#", type: "link"},
                {text: "Gen 1", href: "#", type: "text"},
                {text: "Yellow", href: "#", type: "link"},
                {text: "Red/Blue", href: "#", type: "link"}
            ]
        },
        {
            image: {}, //todo: add the image here too
            title: "Community",
            shortTitle: "Community",
            items:[
                {text: "Pokemon Q&A", href: "#", type: "link"},
                {text: "Pokemon Rate My Team", href: "#", type: "link"},
                {text: "Meta(Suggestions)", href: "#", type: "link"}
            ]
        },
        {
            image: {}, //todo: add the image here also
            title: "Other",
            shortTitle: "Other",
            items:[
                {text: "Pokemon News", href: "#", type: "link"},
                {text: "Maps/Puzzles", href: "#", type: "link"},
                {text: "About/Contact Us", href: "#", type: "link"}
            ]
        }
    ]

    return (
        <Navbar expand={false}>
            <Nav id={"navbar"}>
                {menuItems.map((menu,index)=>(
                    <Container key={index}>
                        <img src={Object.values(menu.image)[0]} className="dropMenuIcon" alt="icon"/>
                        <NavDropdown key={index} title={handleTitle(menu.title, menu.shortTitle)} className={"hoverDropdown"} renderMenuOnMount={true}>
                            {menu.items.map((item,idx)=>(
                                <NavDropdown.Item key={idx} href={item.href} className={item.type}>
                                    {item.text}
                                </NavDropdown.Item>
                             ))}
                        </NavDropdown>
                    </Container>
                ))}
                <div id="#searchbar">search</div>
            </Nav>
        </Navbar>
    )

}