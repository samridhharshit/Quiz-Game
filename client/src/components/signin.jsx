import React from "react";
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
// for making get post request at the server
import axios from 'axios';
import { Redirect } from 'react-router';

class SignIn extends React.Component {

    state = {
        email: "",
        password: "",
        reroute: false,
        display: "hidden"
    }

    handleSignIn = async (event) => {
        event.preventDefault();

        const { email } = this.state;

        const credentials = {
            email
        }

        // alert('open the email which you just enter in order to sign in. Ignore already signed in');
        await this.setState({display: ""}, async () => await console.log(this.state.display));

        //calling a post request and saving the data into the database
        axios
            .post('/signin', credentials)
            .then(async (res) => await console.log(res))
            .catch(err => {
                console.error(err);
            });

    };

    // changes the state "email" and calls a callback
    changeEmail = (event) => {
        event.preventDefault();
        this.setState({email: event.target.value}, () => {console.log(this.state.email)});
    };

    render() {

        if(this.state.reroute === true) {
            return <Redirect push to='/' />;
        }

        return (
            <div className='container-fluid signin-overlay'>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="header">
                            <h1>The Quiz Game</h1>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col"></div>
                    <div className={`col-lg-5 col-md-6 col-sm-8 ${!this.state.display}`}>
                        <Form onSubmit={this.handleSignIn} className={`signin ${this.state.class}`}>
                            <Row form>
                                <Col md={12} className={`cont  ${!this.state.display}`}>
                                    <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input type="email" name="email" id="email" placeholder="Email" value={this.state.email} onChange={this.changeEmail} required />
                                    </FormGroup>
                                    <Button block type='submit'>Sign in</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    <div className="col"></div>

                </div>
                <div className={`row`}>
                    <div className="col"></div>
                    <div className={`col-lg-6 col-md-8 col-sm-10 ${this.state.display} message`}>
                        <h2>Open the email with which you Registered right now.</h2>
                        <h3>Thank You!</h3>
                        <h4 style={{textAlign:"center"}}>*please check your spam if you did receive the mail</h4>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        )
    }
}

export default SignIn;