import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import { getMovies, addMovie, addScreening} from "../data-provider";
import Movie from './movie';
import { Divider, Button, Dialog, Classes } from '@blueprintjs/core';
import EditableMovie from './editable-movie'

export default class Movies extends React.Component {
    constructor(props) {
        super(props);
        this.token = sessionStorage.getItem('utoken')
        this.state = {
            moviesList: [],
        };
        
        this.polling = setInterval(()=> {
            if (this.screening){
                this.onScreeningClicked(this.screening, undefined, this.movie, undefined)
            }
        }, 3000)
    }
    async componentDidMount(){
        const movies = await getMovies(this.token)
        console.log("Here we are:", movies[0]);
        
        this.setState({moviesList: movies})
    }
    componentWillUnmount(){
        clearInterval(this.polling)
    }
    async onAddMovieClicked(genre, length, screenId, title){
        console.log("onAddMovieClicked: ", genre, length, screenId, title);
        // make
        const res = await addMovie(this.token, screenId, title, genre, length)
        console.log("onAddMovieClicked: ", res);
        
        this.setState((prev) => ({moviesList: [res,...prev.moviesList]}))
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <EditableMovie onAddClick={(genre, length, screenId, title) => this.onAddMovieClicked(genre, length, screenId, title)}/>
                        {this.state.moviesList.map((movie, movieIndex) => (
                            <div>
                                <Divider />
                                <Movie {...movie} onClick={() => console.log("clicked " + movieIndex)} onAddClick={(dateTime) => this.onScreeningClicked(dateTime, movie, movieIndex)} />
                            </div>
                        ))}
                    </Col>
                    {/* <Col >
                        {this.renderReservations()}
                    </Col> */}
                </Row>
                <Dialog isOpen={this.state.showDialog} title="Confirm Reservation">
                    <div className={Classes.DIALOG_BODY}>
                        <p>
                            <strong>
                                Are you sure you want to make this reservation
                            </strong>
                        </p>
                    </div>
                    <div className={Classes.DIALOG_FOOTER}>
                        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                            <Button onClick={() => this.setState({showDialog: false})}>Close</Button>
                            <Button intent="primary" onClick={() => this.onReservationConfirmed()}>Reserve the seat</Button>
                        </div>
                    </div>
                </Dialog>
            </Container>
        );
    }

    async onScreeningClicked(datetime, movie, movieIndex){
        console.log("onScreeningClicked", datetime, movie, movieIndex)
        const res = await addScreening(this.token, movie.id, datetime)
        this.setState((prevState)=> {
            console.log(prevState);
            prevState.moviesList[movieIndex].screenings = [res ,...prevState.moviesList[movieIndex].screenings]
            return prevState
        })
        // this.setState({reservedSeats: reservations, numCols: movie.screen.cols, numRows: movie.screen.rows})
    }
}