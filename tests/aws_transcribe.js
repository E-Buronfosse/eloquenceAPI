const index = require('../index.js')
const {json} = require("express");




function TestDuRenvoieDuJson() {

    if(index.getTranscriptionDetails()){
        console.log("test reussi AWS renvoie bien un JSON")
    }else {
        console.log("test failed")
    }
}

await TestDuRenvoieDuJson()