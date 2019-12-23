import React from 'react';

import { Link } from "react-router-dom";
import { Button } from "reactstrap";

class Answers extends React.Component {

    state = {
        display: "hidden"
    }

    componentDidMount() {
        if (!this.props.disableValue === false) {
            this.setState({display: "block"}, async () => await console.log(this.state.display));
        }
    }

    render() {
        console.log(JSON.stringify(this.props.title["title"]) + " : " + JSON.stringify(this.props.title["message"]));
        return (
            <div className={`answers ${this.state.display}`}>
                <h2>{this.props.title["title"]}</h2>
                <h3>{this.props.title["message"]}</h3>
                <Link to='/home'><Button outline color='primary' block size="lg" onClick={this.props.stopTimer}>Home</Button></Link>
            </div>
        )
    }
}

export default Answers;