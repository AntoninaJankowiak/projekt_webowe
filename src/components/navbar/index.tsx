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
        return windowWidth < 920 ? shortTitle : title
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
                {text: "National pokedex", href: "/pokedex/national", type:"link"}
            ]

        },
        {
            image: {icon_gear},
            title: "Game mechanics",
            shortTitle: "Mechanics",
            items: [
                {text: "Breeding & egg groups", href: '/mechanics/breeding', type:"link"},
                {text: "Move tutors", href: '/mechanics/move-tutors', type:"link"},
                {text: "Effort values (EVs)", href: '/mechanics/ev', type:"link"},
                {text: "Natures", href: '/mechanics/natures', type:"link"},
                {text: "IVs/Personality", href: '/mechanics/ivs', type:"link"},
                {text: "Useful tools", href:"#", type:"text"} ,
                {text: "Moveset searcher", href: '/tools/moveset-search', type:"link"},
                {text: "Type coverage calculator", href: '/tools/type-coverage', type:"link"}
            ]
        },
        {
            image: {icon_games},
            title: "Pokemon games",
            shortTitle: "Games",
            items:[
                {text: "Gen 2", href: "", type: "text"},
                {text: "Crystal", href: "/game/crystal", type: "link"},
                {text: "Gold/Silver", href: "/game/gold-silver", type: "link"},
                {text: "Gen 1", href: "", type: "text"},
                {text: "Yellow", href: "/game/yellow", type: "link"},
                {text: "Red/Blue", href: "/game/red-blue", type: "link"}
            ]
        },
        {
            image: {}, //todo: add the image here
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
                {text: "Pokemon News", href: "/news", type: "link"},
                {text: "Maps/Puzzles", href: "/maps", type: "link"},
                {text: "About/Contact Us", href: "/about", type: "link"}
            ]
        }
    ]

    return (
        <Navbar expand={false}>
            <Nav id={"navbar"}>
                {menuItems.map((menu,index)=>(
                    <Container key={index} classname="ligma">
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
                <div id="searchbar"><input type="text" placeholder="Search" name="search" className="searchField"/></div>

            </Nav>
        </Navbar>
    )

}