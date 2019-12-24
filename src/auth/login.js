import React from 'react'
import {Form, Button, Container} from 'react-bootstrap'
import 'axios'
import { login } from "../data-provider";
import {Redirect} from 'react-router'
import {
    withRouter
} from 'react-router-dom'
import { Toast } from '@blueprintjs/core';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loggedIn: false, username: '', password: '', error: ''};
    }

    componentDidMount(){
        this.setState({loggedIn: sessionStorage.getItem('utoken')})
    }
    render() {
    if (this.state.loggedIn) {
        return <Redirect to={sessionStorage.getItem('urole') === 'admin' ? '/admin': '/movies'} />
    }
      return (
        <Container >
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control required placeholder="Enter email"  onChange={
                    (e) =>{this.setState({username: e.target.value})}
                    }/>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" required placeholder="Password" onChange={
                    (e) =>{this.setState({password: e.target.value})}
                    }/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={
                async (e) => {
                    e.preventDefault()
                    try {
                        const res = await login(this.state.username, this.state.password)
                        console.log(res.token)
                        sessionStorage.setItem('utoken', res.token)
                        sessionStorage.setItem('urole', res.role)
                        this.setState({ loggedIn: true })
                    } catch (error) {
                        this.setState({error: 'invalid data'})
                    }
                }
            }>
                login
            </Button>

            <Button variant="link" onClick={
                async (e) => {
                    e.preventDefault()
                    this.props.history.push('/signup')
                }
            }>
                signup
            </Button>
        </Form>
        </Container>
      );
    }
}

export default withRouter(Login)