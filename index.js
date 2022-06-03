const express = require('express')
const app = express()

const https = require('https') // or 'https' for https:// URLs
const fs = require('fs')
const createBuffer = require('audio-buffer-from')

<<
<< << < HEAD
const port = 3000
const cors = require('cors')
const axios = require('axios')
const fetch = require('cross-fetch')
const bodyParser = require('body-parser')
const { urlencoded } = require('express') ===
    === =
    const cors = require("cors");
const axios = require("axios");
const fetch = require('cross-fetch');
var bodyParser = require("body-parser");
const { urlencoded } = require("express"); >>>
>>> > c109acff4611d1f79f015d20e673689151af6e86

const AWS = require('aws-sdk')

const userCtrl = require('./controllers/userCtrl')
const auth = require('./toolBox/auth')

// aws
const { TranscribeClient, StartTranscriptionJobCommand, GetTranscriptionJobCommand } = require('@aws-sdk/client-transcribe')
const { S3, PutObjectCommand } = require('@aws-sdk/client-s3')
const { allowedNodeEnvironmentFlags } = require('process')

const AWS_REGION = 'eu-west-1'
const AWS_ACCESS_KEY = 'AKIAXWQAMBQ7AKNQB52E'
const AWS_SECRET_KEY = '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'

const config = {
    region: AWS_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY
    }
}

const s3 = new AWS.S3({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY
})

const fileName = 'salut.wav'

const uploadFile = () => {
    fs.readFile(fileName, (err, data) => {
        if (err) throw err
        const params = {
            Bucket: 'test-aws-translate-eloquence', // pass your bucket name
            Key: 'salut.wav', // file will be saved as testBucket/contacts.csv
            Body: data
        }
        s3.upload(params, function(s3Err, data) {
            if (s3Err) throw s3Err
            console.log(data)
        })
    })
}

// uploadFile();

const client = new TranscribeClient(config)

const getRandomName = Math.random().toString(32)
console.log(getRandomName)
const params = {
    TranscriptionJobName: getRandomName,
    LanguageCode: 'en-US', // For example, 'en-US'
    MediaFormat: 'mp3', // For example, 'wav'
    Media: {
        MediaFileUri: 's3://test-aws-translate-eloquence/transcribe-sample.5fc2109bb28268d10fbc677e64b7e59256783d3c.mp3'
    }
}

const run = async() => {
    try {
        const data = await client.send(new StartTranscriptionJobCommand(params))
        getTranscriptionDetails()
    } catch (err) {
        console.log('Error', err)
    }
}

const getTranscriptionDetails = async() => {
    try {
        const data = await client.send(new GetTranscriptionJobCommand(params))
        const status = data.TranscriptionJob.TranscriptionJobStatus
        if (status === 'COMPLETED') {
            console.log('URL:', data.TranscriptionJob.Transcript.TranscriptFileUri)
            const URL = data.TranscriptionJob.Transcript.TranscriptFileUri
            const file = fs.createWriteStream('test.json')
            const request = https.get(URL, function(response) {
                response.pipe(file)
                file.on('finish', () => {
                    file.close()
                    const testFile = fs.readFileSync('./test.json')
                    const getTranscribe = JSON.parse(testFile)
                    console.log(getTranscribe.results.transcripts[0].transcript)
                })
            })
        } else if (status === 'FAILED') {
            console.log('Failed:', data.TranscriptionJob.FailureReason)
        } else {
            console.log('In Progress...')
            getTranscriptionDetails()
        }
    } catch (err) {
        console.log('Error', err)
    }
}

// run();

// test workflow

require('./toolBox/auth')
require('./globales')

app.use(cors({
    credentials: true
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/test', async(req, res) => {
    console.log('reçu...')
    const bytes = req.body.bytes
    const blobUrl = req.body.blobUrl
    console.log('blob : ' + blobUrl)
    console.log(bytes)
    console.log('test ajout sonacube')

    const callback = function() {
        console.log('toto')
    }

    const fileAudio = fs.writeFileSync('audio.wav', Buffer.from(bytes), (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log(data)
        }
    })
    res.send('test réponse bien reçue')
})

app.get('/users/tokenTest', (req, res) => {
    const hasValidToken = auth.checkToken(req, res)
    console.log('token envoyé : ' + req.get('authorization'))
    console.log('token server : ' + global.userToken)
    if (!hasValidToken) {
        return res.status(401).json({ error: 'token invalide' })
    }
    console.log(req.get('authorization'))
})

app.post('/users/signup', (req, res) => {
    userCtrl.signup(req, res)
})

app.post('/users/signin', (req, res) => {
    userCtrl.signin(req, res)
});
app.listen(process.env.PORT || 3000, () => {
    console.log(`Example app listening on port`);
});

function sendAnalysis(analysis) {}