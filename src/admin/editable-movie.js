import React from 'react'
import { Button, Card, Elevation, Tag, NumericInput, InputGroup, Divider } from "@blueprintjs/core";
import Screenings from "./screenings";



class EditableMovie extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            genre: "aksmd",
            length: 50,
            title: '',
            screenId: NaN,
        }
    }
    render() {
        return (
            <Card interactive={false} elevation={Elevation.ONE}>
                <h5><InputGroup placeholder="Movie title" onChange={(e) => this.setState({title: e.target.value})}/></h5>
                <p>This movie will be presented on screen <NumericInput placeholder="screen id" onValueChange={(screenId) => this.setState({screenId})} min={5} max={5*60}/></p>
                <span>
                    <InputGroup placeholder="Movie genre" onChange={(e) => this.setState({genre: e.target.value})}/> 
                    <NumericInput placeholder="length in mins" onValueChange={(length) => this.setState({length: length*60})} min={5} max={5*60}/>
                </span>
                {/* <Screenings data={this.props.screenings} /> */}
                <Divider />
                <Button intent="primary" fill large text="Add Movie" onClick={() => this.props.onAddClick(this.state.genre, this.state.length, this.state.screenId, this.state.title)}/>
            </Card>
        )
    }
}



export default EditableMovie