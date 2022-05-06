
const express = require("express");
const app = express();

const https = require('https'); // or 'https' for https:// URLs
const fs = require('fs');


const port = 3000;
const cors = require("cors");
const axios = require("axios");
const fetch = require('cross-fetch');
var bodyParser = require("body-parser");
const { urlencoded } = require("express");

const userCtrl = require("./controllers/userCtrl");
const auth = require("./toolBox/auth");


//aws
const { TranscribeClient, StartTranscriptionJobCommand, GetTranscriptionJobCommand } = require("@aws-sdk/client-transcribe");
const { S3, PutObjectCommand } = require("@aws-sdk/client-s3");


const AWS_REGION = "eu-west-1";
const AWS_ACCESS_KEY = "AKIAXWQAMBQ7AKNQB52E";
const AWS_SECRET_KEY = "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";

const config = {
    region: AWS_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY,
    },
};

const client = new TranscribeClient(config);



var getRandomName = Math.random().toString(32);
console.log(getRandomName);
const params = {
    TranscriptionJobName: getRandomName,
    LanguageCode: "en-US", // For example, 'en-US'
    MediaFormat: "mp3", // For example, 'wav'
    Media: {
        MediaFileUri: "s3://test-aws-translate-eloquence/transcribe-sample.5fc2109bb28268d10fbc677e64b7e59256783d3c.mp3",
    },
};

const run = async() => {
    try {
        const data = await client.send(new StartTranscriptionJobCommand(params));
        getTranscriptionDetails();
    } catch (err) {
        console.log("Error", err);
    }
};

module.exports.getTranscriptionDetails = async() => {
    try {
        const data = await client.send(new GetTranscriptionJobCommand(params));
        const status = data.TranscriptionJob.TranscriptionJobStatus;
        if (status === "COMPLETED") {
            console.log("URL:", data.TranscriptionJob.Transcript.TranscriptFileUri);
            var URL = data.TranscriptionJob.Transcript.TranscriptFileUri;
            const file = fs.createWriteStream("test.json");
            const request = https.get(URL, function(response) {
                response.pipe(file)
                file.on("finish", () => {
                    file.close();
                    let testFile = fs.readFileSync('./test.json');
                    let getTranscribe = JSON.parse(testFile);
                    var trancription = getTranscribe.results.transcripts[0]['transcript']
                    var itemslength = getTranscribe.results.items.length
                    //console.log(itemslength)


                    //console.log(getTranscribe.results.transcripts[0]['transcript']);


                    const compterMot= async() => {

                        var nombre = 0;
                        var split = trancription.split(' ');
                        for (var i = 0; i < split.length; i++)
                        {
                            if (split[i] !== "")
                            {
                                nombre += 1;
                            }
                        }
                        console.log("il y a "+nombre+" mots")
                        var time = getTranscribe.results.items[nombre]['end_time']
                        console.log(time)
                        var motmin = (nombre)/time
                        var finalement = motmin.toFixed(2)
                        if (finalement> 3 ){
                            console.log(finalement+" mot par seconde votre est débit est légérement rapide pensé a prendre votre temps pour être bien audible")
                        }else if (finalement<2){
                            console.log(finalement+" mot par seconde votre débit est légérement inférieur vous risquer d'endormir votre oratoir pensé à rythmé votre discours ")
                        }else {
                            console.log(finalement + " mot par seconde vous avez un bon rythme bravo")
                        }
                    };
                    //compterMot();


                });

            });


        } else if (status === "FAILED") {
            console.log("Failed:", data.TranscriptionJob.FailureReason);
        } else {
            console.log("In Progress...");
            getTranscriptionDetails();
        }

    } catch (err) {
        console.log("Error", err);
        return '';
    }

};


console.log("run");
run();



require("./toolBox/auth");
require("./globales");
const {getTranscriptionDetails} = require("./index");


app.use(cors({
    credentials: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.post('/test', (req, res) => {
    console.log('reçu...');

});

app.get('/users/tokenTest', (req, res) => {
    let hasValidToken = auth.checkToken(req, res);
    console.log("token envoyé : " + req.get('authorization'));
    console.log("token server : " + global.userToken);
    if (!hasValidToken) {
        return res.status(401).json({ 'error': 'token invalide' });
    }
    console.log(req.get('authorization'));
});

app.post('/users/signup', (req, res) => {
    userCtrl.signup(req, res);
});

app.post('/users/signin', (req, res) => {
    userCtrl.signin(req, res)
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

