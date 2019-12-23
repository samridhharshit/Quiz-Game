const express = require('express');
const app = express();
const sgMail = require('@sendgrid/mail');
const bodyParser = require('body-parser');
const cors = require('cors');
var uniqid = require('uniqid');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));


const port = 5000;

const mongoUtil = require('./database');
mongoUtil.connectToServer( function( err, client ) {
    if (err) console.log(err);
} );

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.get('/quiz/:difficulty', (req, res) => {
    const difficulty = req.params.difficulty;
    // console.log("difficulty " + JSON.stringify(req.params));
    let db = mongoUtil.getDb();
    if (difficulty === 'easy-questions') {
        db.collection('EasyQuestions').find({}).toArray((err, data) => {
            if (err) throw err;
            res.end(JSON.stringify(data));
            // console.log(data);
        })
    } else if (difficulty === 'moderate-questions') {
        db.collection('Moderatequestions').find({}).toArray((err, data) => {
            if (err) throw err;
            res.end(JSON.stringify(data));
            // console.log(data);
        })
    } else {
        db.collection('HardQuestions').find({}).toArray((err, data) => {
            if (err) throw err;
            res.end(JSON.stringify(data));
            // console.log(data);
        })
    }

});

//signin and saving credentials
app.post('/signin', (req, res) => {

    var uniqueHash = uniqid();
    console.log(uniqueHash);
    const data = {
        email: req.body.email,
        token: uniqueHash
    }

    console.log(data);

    // importing db from database file
    let db = mongoUtil.getDb();
    db.collection('credentials').insertOne((data), (err, data) => {
        if (err) throw err;
        // console.log(data);
    });

    const link = `http://localhost:5000/home?q=${data.token}`

    const msg = {
        to: `${req.body.email}`,
        from: 'some66819@gmail.com',
        subject: 'Verify Your account for playing the Quiz Game!',
        text: `access mail`,
        html: `open this link: ${link} .Now you can access the game anytime from here!`
    };
    console.log(msg);
    sgMail.send(msg)
        .catch(reason => console.log(reason));

    // console.log(`/home?q=${data.token}`)
    // res.redirect(`/home?q=${data.token}`);
});

app.get(`/home`, (req, res) => {
    //receiving query parameter from the route
    const query = req.query.q;
    //checking in db if the token exsts
    let db = mongoUtil.getDb();
    db.collection('credentials').find({token: query}).toArray((err, data) => {
        if (err) {throw err;}
        else if (data === null || data.length === 0) {
            console.log('record not found')
            res.redirect('http://localhost:3000/resignin');
        } else {
            console.log(data);
            res.redirect('http://localhost:3000/signin');
        }
    })
})


app.listen(port, () => {console.log(`App is listening to port ${port}`)});

