import React from 'react'
import { UL, Classes } from "@blueprintjs/core";
 


const Screenings = (props) => {
    const screenings = props.data
    return (
        <UL className={Classes.LIST}>
            {screenings.map((s, i) => (
                <li><a href='#' onClick={() => props.onScreeningClicked(s, i)}> {s.dateTime} </a></li>
            ))}
        </UL>
    )
}

export default Screenings