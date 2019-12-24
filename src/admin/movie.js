import React from 'react'
import { Button, Card, Elevation, Tag } from "@blueprintjs/core";
import Screenings from "./screenings";



const Movie = (props) => {
    return (
        <Card interactive={!props.selected} elevation={props.selected ? Elevation.FOUR : Elevation.ONE} onClick={props.onClick}>
            <h5><a href={`/movies#${props.id}`}>{props.name}</a></h5>
            <p>This movie will be presented on screen {props.screen.number}</p>
            <Tag round={true}>{props.genre}</Tag>
            <Tag round>{props.length / 60} mins</Tag>
            <Screenings data={props.screenings} onScreeningClicked={props.onScreeningClicked} onAddClick={props.onAddClick}/>
        </Card>
    )
}

export default Movie