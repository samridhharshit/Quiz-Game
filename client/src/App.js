import React from 'react';
import './App.css';

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Parent from "./components/Parent";
import Questions from "./components/Questions";
import SignIn from "./components/signin";
import ReSignIn from "./components/resignin";

class App extends React.Component {

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={SignIn} />
                        <Route path="/quiz/" component={Questions} />
                        <Route path='/signin' component={Parent} />
                        <Route path='/home' component={Parent} />
                        <Route exact path='/resignin' component={ReSignIn} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
