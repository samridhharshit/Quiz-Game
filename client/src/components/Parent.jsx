import React from "react";

import Options from "./Options";

class Parent extends React.Component {
    render() {
        return (
            <div className="parent">
                <div className="header">
                    <h1>The Quiz Game</h1>
                </div>
                <div className="signin">
                    <h3>You are signed up. Now you can access our game!</h3>
                </div>
                <div className="options">
                    <Options />
                </div>
            </div>
        )
    }
}

export default Parent;