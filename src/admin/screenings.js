import React from 'react'
import { UL, Classes, Button } from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
import moment from "moment";


// const Screenings = (props) => {
//     return (
//         <UL className={Classes.LIST}>
//             <li><span><DateInput timePrecision="minute" {...momentFormatter("YYYY-MM-DD HH:mm")} onChange={(date) => } defaultValue={new Date()}/> <Button intent="primary" onClick={() => props.onAddClick()}>Add</Button></span> </li>
//             {screenings.map((s, i) => (
//                 <li> {s.dateTime} </li>
//             ))}
//         </UL>
//         // <DateInput {...momentFormatter("YYYY-MM-DD HH:mm")}/>
//     )
// }
class Screenings extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            date: ''
        }
    }
    render(){
        const screenings = this.props.data
        return (
            <UL className={Classes.LIST}>
                <li><span><DateInput timePrecision="minute" {...momentFormatter("YYYY-MM-DD HH:mm")} onChange={(date) => this.setState({date})} defaultValue={new Date()}/> <Button intent="primary" onClick={() => this.props.onAddClick(this.state.date)}>Add</Button></span> </li>
                {screenings.map((s, i) => (
                    <li> {s.dateTime} </li>
                ))}
            </UL>
        )
    }
}

function momentFormatter(format) {
    return {
        formatDate: date => moment(date).format(format),
        parseDate: str => moment(str, format).toDate(),
        placeholder: `${format} (moment)`,
    };
}

export default Screenings