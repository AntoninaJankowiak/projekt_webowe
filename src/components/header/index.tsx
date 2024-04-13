import React from 'react'
import './style.scss'
import Banner from "../../assets/baner.png"

export default function Header() {
    return (
        <header id="pageHeader">
            <a href="/"><img src={Banner} alt="Banner" id="mainBanner"/></a>
        </header>
    )
}