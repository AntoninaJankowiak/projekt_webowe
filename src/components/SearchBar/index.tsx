import React from "react"
import './style.scss'
import searchIcon from "../../assets/icon_search.png"

export default function SearchBar(){
    return (
        <div id="searchbar">
            <input type="text" placeholder=" Search" name="search" className="searchField"/>
            <img src={searchIcon}/>
        </div>
    )
}