import React from 'react'
import './style.scss'
import Banner from "../../assets/baner.png"

export default function Header() {
    return (
        <header id="pageHeader">
            <img src={Banner} alt="Banner" id="mainBanner" />
        </header>
    )
}