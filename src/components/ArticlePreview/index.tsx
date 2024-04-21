import React from "react"
import './style.scss'
import Video from "../Video"
import Container from "../Container"
import NewsSidePanel, {NewsNav} from "../NewsSidePanel"
import {formatDate} from "../Article"
//to be used only in express code so link is fixed etc, won't work for not
//TODO: don't forget about this component when doing express, do styling later
export default function ArticlePreview({newsTitle, date, newsCategory, introPg, videoLink, articleLink}: {newsTitle: string, date: string, newsCategory: string, introPg: string, videoLink: string, articleLink: string}){
    return (
        <Container classname={"articlePreview"}>
            <h1 className={"newsTitle_P"}>{newsTitle}</h1>
            <p className={"newsDate_P"}>{newsCategory} - {formatDate(date)}</p>
            <p className={"introP_P"}>{introPg}</p>
            <Video videoId={videoLink}/>
            <a href={articleLink}>Continue Reading »</a>
        </Container>
    )
}