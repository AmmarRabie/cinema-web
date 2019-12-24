import React from 'react'
import {Form, Button, Container} from 'react-bootstrap'
import {signup} from "../data-provider";
import {Redirect} from 'react-router'
import {
    withRouter
} from 'react-router-dom'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";


export class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loggedIn: false, username: '', password: '', fname: '',lname: '',email: '', birthDate: ''};
      }
    render() {
        if (this.state.loggedIn) {
            return <Redirect to={sessionStorage.getItem('urole') === 'admin' ? '/admin': '/movies'} />
        }
      return (
        <Container >
        <Form>
            <Form.Group controlId="fname">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" required placeholder="like: Ammar"  onChange={
                    (e) =>{this.setState({fname: e.target.value})}
                    }/>
            </Form.Group>
            <Form.Group controlId="lname">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" required placeholder="like: Rabie"  onChange={
                    (e) =>{this.setState({lname: e.target.value})}
                    }/>
            </Form.Group>
            <Form.Group controlId="username">
                <Form.Label>User name</Form.Label>
                <Form.Control type="text" required placeholder="like: AmmarRabie897"  onChange={
                    (e) =>{this.setState({username: e.target.value})}
                    }/>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" required placeholder="like: ammar.s.rabie@gmail.com"  onChange={
                    (e) =>{this.setState({email: e.target.value})}
                    }/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" required placeholder="Password" onChange={
                    (e) =>{this.setState({password: e.target.value})}
                    }/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Birth Date</Form.Label> <br></br>
                <DatePicker selected={this.state.birthDate} onChange={(e) => this.setState({birthDate: e})}/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={
                async (e) => {
                    e.preventDefault()
                    try {
                        const res = await signup(this.state.fname, this.state.lname, this.state.username, this.state.email,this.state.password, this.state.birthDate)
                        console.log(res)
                        sessionStorage.setItem('utoken', res.token)
                        sessionStorage.setItem('urole', res.role)
                        this.setState({loggedIn: true})  
                    } catch (error) {
                        
                    }
                }
            }>
                Signup
            </Button>
        
        </Form>
        </Container>
      );
    }

}

export default withRouter(Signup)