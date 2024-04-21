import React from "react"
import './style.scss'
import Video from "../Video"
import List, {ListItems} from "../List"
import Container from "../Container"
import NewsSidePanel, {NewsNav} from "../NewsSidePanel"

export function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

const newsItems:NewsNav={
    news:[
        {date: '2024-04-05', category: 'example', title: 'dfdsfsf', href: '#'}
    ]


}

export default function Article({listItems,date,introPg,mainPg, newsTitle, newsCategory, videoLink }: {listItems: ListItems, date:string, introPg: string, mainPg: string, newsTitle: string, newsCategory: string, videoLink?: string }){


    return (
        <Container classname={"outerNewsCon"}>
            <h1 className={"newsTitle"}>{newsTitle}</h1>
            <p className={"newsDate"}>{newsCategory} - {formatDate(date)}</p>
            <Container classname={"midNewsCon"}>
            <Container classname={"innerNewsCon"}>
                <p className={"introP"}>{introPg}</p>
                <Video videoId={videoLink ? new URL(videoLink).searchParams.get('v') : 'dQw4w9WgXcQ'}/>
                <p className={"mainP"}>{mainPg}</p>
                <List listItems={listItems}></List>
            </Container>
            <NewsSidePanel newsNav={newsItems}/>
            </Container>
        </Container>
    )
}