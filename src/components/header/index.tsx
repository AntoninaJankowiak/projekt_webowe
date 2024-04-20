import React, {useEffect, useState} from 'react'
import './style.scss'
import Banner from "../../assets/baner.png"
import sBanner from "../../assets/sBanner.png"




export default function Header() {
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

    const handleBannerSize = (Banner,sBanner) =>{
        return windowWidth < 875 ? sBanner : Banner
    }

    return (
        <header id="pageHeader">
            <a href="/"><img src={handleBannerSize(Banner, sBanner)} alt="Banner" id="mainBanner"/></a>
        </header>
    )
}