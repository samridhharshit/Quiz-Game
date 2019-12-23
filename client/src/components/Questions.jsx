import React from "react";
import axios from "axios";

import { Form, FormGroup, Button } from 'reactstrap'
// import { Redirect } from 'react-router';

// import Timer from './timer';
import Answers from "./answers";

class Questions extends React.Component {
    state = {
        data: [],
        title: "",
        result: 0,
        Stoptimer: false,
        gotohome: false,
        disable: false,
        Class: ""
    };

    componentDidMount() {

        // fetching the username from the url
        var url = window.location.pathname;
        console.log(url);

        //fetching questions from the database
        axios
            .get(url)
            .then(async (res) => {
                await this.setState({data: res.data});
                await console.log(this.state.data);
                await console.log(res.data[0]._id)
            })
            .catch(err => {
                console.error(err);
            });

        //    timer working functionality
        // Set the date we're counting down to
        var temp = new Date().getTime();
        var countDownDate = new Date().setTime(temp + 1000*60);

        var that = this;
        // Update the count down every 1 second
        var x = setInterval( function() {

            // Get today's date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - now;
            // console.log(distance);
            // Time calculations for days, hours, minutes and seconds
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            //message
            // console.log(`Your result is ${that.state.result}`)
            var timeout = {
                title: 'Your Answer Submitted',
                message: `Your result is ${that.state.result}`
            }
            var submit = {
                title: 'Session Expired',
                message: `Your result is ${that.state.result}`
            }

            //when redirected to home
            if (that.state.gotohome === true ){
                clearInterval(x);
            }
            //submit button clicked
            else if (that.state.Stoptimer === true) {
                clearInterval(x);
                that.setState({disable: true, Class: "displayNone", title: timeout}, async () => await console.log(that.state.title))
                // alert(JSON.stringify(timeout));
                // Display the result in the element with id="demo"
                document.getElementById("demo").innerHTML = minutes + "m " + seconds + "s ";
            }
            // If the count down is finished, write some text
            else if (distance <= 0) {
                clearInterval(x);
                that.setState({disable: true, Class: "displayNone", title: submit}, async () => await console.log(that.state.disable))
                // alert(JSON.stringify(submit));
                // Display the result in the element with id="demo"
                document.getElementById("demo").innerHTML = minutes + "m " + seconds + "s ";
            } else if ( document.getElementById("demo") ){
                // Display the result in the element with id="demo"
                document.getElementById("demo").innerHTML = minutes + "m " + seconds + "s ";
            }


        }, 1000);
    }

    stopTimer = () => {
        this.setState({gotohome: true}, async () => await console.log(this.state.gotohome));
    }

    // handling form submit
    handleSubmit = async (e) => {
        await this.setState({Stoptimer: true});
        let question_blocks = document.getElementsByClassName('question-container');

        let responses = {};
        for( let i=0; i<question_blocks.length;i++){
            let question_block = question_blocks[i];
            if (question_block.querySelector('input[name="options"]:checked'))
                responses[question_block.id] = question_block.querySelector('input[name="options"]:checked').getAttribute('num');
            //console.log(question_block.querySelector('input[name="options"]:checked').id)
        }
        console.log(responses);

        const { data } = this.state;
        var count = 0;
        for (let i = 0; i < 5; i++) {
            var key = "q-" + (i+1);
            // console.log((options[key]) + " : " + data[i].answer);
            // console.log(options);
            if ((responses[key]) === data[i].answer) {
                count = count + 1;
                // console.log(count);
            }
        }
        // console.log(count);
        await this.setState({result: count});
    };

    render() {
        const { data } = this.state;

        return (
            <div className="easyquestions">
                <div className="timer">
                    {/*place your timer here*/}
                    <p id="demo"></p>
                </div>
                <div className="row header-timer">
                    <div className="col-sm-12">
                        <h1>Your Questions</h1>
                    </div>
                </div>
                {
                    data.map((obj) => (
                        <div key={obj._id} id={"q-"+obj._id} className="row question-container">

                            <div className="question">
                                <h4>{obj._id}</h4>
                                <h4>. {obj.question}</h4>
                            </div>
                            <Form className="answer-options">
                                <FormGroup>
                                    <input type="radio" value={obj.o1} id={obj._id+"-option1"} name="options" num='1' />
                                    <label htmlFor={obj._id+"-option1"}>{obj.o1}</label>
                                </FormGroup>
                                <FormGroup>
                                    <input type="radio" value={obj.o2} id={obj._id+"-option2"} name="options" num='2'/>
                                    <label htmlFor={obj._id+"-option2"} >{obj.o2}</label>
                                </FormGroup>
                                <FormGroup>
                                    <input type="radio" value={obj.o3} id={obj._id+"-option3"} name="options" num='3'/>
                                    <label htmlFor={obj._id+"-option3"}>{obj.o3}</label>
                                </FormGroup>
                                <FormGroup>
                                    <input type="radio" value={obj.o4} id={obj._id+"-option4"} name="options" num='4'/>
                                    <label htmlFor={obj._id+"-option4"}>{obj.o4}</label>
                                </FormGroup>
                            </Form>
                        </div>
                    ))
                }
                <div className={`navigation-container ${this.state.Class}`}>
                    <Button outline size='lg' onClick={this.handleSubmit} color="info" disabled={this.state.disable}>Submit</Button>
                    {/*    display answers*/}
                    <Answers disableValue={!this.state.disable} title={this.state.title} stopTimer={this.stopTimer} />
                </div>
            </div>
        )
    }
}

export default Questions;