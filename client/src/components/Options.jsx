import React from "react";

import { Button } from 'reactstrap';
import { Link } from "react-router-dom";

class Options extends React.Component {
    render() {
        return (
            <div className="row options-row">
                <div className="col-sm-12 col-md-4 options-container">
                    <Button outline color="info" className="buttons"><Link to="/quiz/easy-questions" style={{ textDecoration: 'none' }}><h2>EASY</h2></Link></Button>
                </div>
                <div className="col-sm-12 col-md-4 options-container">
                    <Button outline color="info" className="buttons"><Link to="/quiz/moderate-questions" style={{ textDecoration: 'none' }}><h2>MODERATE</h2></Link></Button>
                </div>
                <div className="col-sm-12 col-md-4 options-container">
                    <Button outline color="info" className="buttons"><Link to="/quiz/hard-questions" style={{ textDecoration: 'none' }}><h2>HARD</h2></Link></Button>
                </div>
            </div>
        )
    }
}

export default Options;