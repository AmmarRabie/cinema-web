import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import { getMovies, getScreeningReservations, makeReservation } from "../data-provider";
import Movie from './movie';
import { Divider, Button, Dialog, Classes, Alert } from '@blueprintjs/core';


export default class Movies extends React.Component {
    constructor(props) {
        super(props);
        this.token = sessionStorage.getItem('utoken')
        this.state = {
            moviesList: [],
            reservedSeats: [],
            numRows: 10,
            numCols: 10,
            showDialog: false,
            showTicketAlert: false,
        };
        
        this.polling = setInterval(()=> {
            if (this.screening){
                this.onScreeningClicked(this.screening, undefined, this.movie, undefined)
            }
        }, 3000)
    }
    async componentDidMount(){
        const movies = await getMovies(this.token)
        this.setState({moviesList: movies})
    }
    componentWillUnmount(){
        clearInterval(this.polling)
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        {this.state.moviesList.map((movie, movieIndex) => (
                            <div>
                                <Divider />
                                <Movie {...movie} onClick={() => console.log("clicked " + movieIndex)} onScreeningClicked={(screening, index) => this.onScreeningClicked(screening, index, movie, movieIndex)} />
                            </div>
                        ))}
                    </Col>
                    <Col >
                        {this.renderReservations()}
                    </Col>
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
                <Alert
                    isOpen={this.state.showTicketAlert}
                    canEscapeKeyCancel
                    canOutsideClickCancel
                    onCancel={() => this.setState({ showTicketAlert: false })}
                    onConfirm={() => this.setState({ showTicketAlert: false })}
                    confirmButtonText="Okay">
                    <p>
                        Your reservation is confirmed, your ticket id is {this.state.ticketId}
                    </p>
                </Alert>
            </Container>
        );
    }

    async onScreeningClicked(screening, index, movie, movieIndex){
        console.log(screening)
        const reservations = await getScreeningReservations(this.token, screening.id)
        this.setState({reservedSeats: reservations, numCols: movie.screen.cols, numRows: movie.screen.rows})
        this.screening = screening // current screening selected
        this.movie = movie // current movie selected
    }
    renderReservations(){
        let rowsJsx = []
        for (let index = 0; index < this.state.numRows; index++) {
            rowsJsx.push(<Divider />)
            rowsJsx.push(<Row>{this.renderCols(index)}
            </Row>)
        }
        rowsJsx.push(<Divider />)
        return rowsJsx
    }
    renderCols(i){
        let colsJsx = []
        for (let j = 0; j < this.state.numCols; j++) {
            const reserved = this.isReserved(`${i}, ${j}`)
            colsJsx.push(
            <Col >
                <Button text={`${i},${j}`} intent={reserved ? "danger": "primary"} disabled={reserved} 
                onClick={reserved ? undefined: () => this.onReserveClick(i, j)}
                />
            </Col>
            )
        }
        return colsJsx
    }

    isReserved(pos){
        return this.state.reservedSeats.find(e => e.pos === pos)
    }

    async onReservationConfirmed(){
        const pos = `${this.row}, ${this.col}`
        let res = await makeReservation(this.token, +this.screening.id, pos)
        console.log(res)
        this.setState({showDialog: false, showTicketAlert:true, ticketId: res.ticket})
        this.onScreeningClicked(this.screening, undefined, this.movie, undefined)
        
    }
    onReserveClick(row, col){
        this.row = row
        this.col = col
        this.setState({showDialog: true})
    }
}