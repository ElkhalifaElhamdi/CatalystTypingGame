const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Typer } = require('../models/typer');

// localhost:3000/typers/
router.get('/', (req, res) => {
    Typer.find((err, docs) => {
        res.send(docs); 
    }
    );
});
router.post('/', (req, res) => {
    var typ = new Typer({
        accuracy: req.body.accuracy,
        wpmSpeed: req.body.wpmSpeed
    });
    typ.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Typer save' + JSON.stringify(err, undefined, 2));}
    });
});


router.get('/avg/', (req, res) => {
    Typer.find((err, docs) => {
        var fullDatabase = docs.toString();
        //docList is of type String[]
        var docList = fullDatabase.split("}");
        
        //2 arraylist of type number that stores acc and wpm
        var accuracy = new Array(docList.length-1);
        var wordPerMinute = new Array(docList.length-1);
        //for loop initializes both arrays with numbers
        for(var i = 0; i < accuracy.length; i++)
        {
            var begAcc = docList[i].substring(docList[i].indexOf("accuracy:"));//returns string from word accuracy => end
            var endAcc = begAcc.substring(0, begAcc.indexOf(","));//returns accuracy: (value)
            var acc = endAcc.substring(endAcc.indexOf(":") + 1);//returns (value)
            var usableAcc = parseFloat(acc);
            accuracy[i] = usableAcc;

            var begWpm = docList[i].substring(docList[i].indexOf("wpmSpeed:"));
            var endWpm = begWpm.substring(0, begWpm.indexOf(","));
            var wpm = endWpm.substring(endWpm.indexOf(":")+ 1);//returns (value)
            var usableWpm = parseFloat(wpm);
            wordPerMinute[i] = usableWpm;
        }
        //get sums to calc average
        var sumAccuracy = 0;
        var sumWpm = 0;
        for(var i = 0; i < docList.length-1; i++)
        {
            sumAccuracy += accuracy[i];
            sumWpm += wordPerMinute[i];
        }
        //get average by dividing by docList.length();
        var avgAccuracy = sumAccuracy/(docList.length-1);
        var avgWpm = sumWpm/(docList.length-1);
        //put averages into
        var stringForm = '{"_id":"5fa77e452ee3052298f4359b","accuracy":'+avgAccuracy.toString()+',"wpmSpeed":'+avgWpm.toString()+',"__v":0}';
        res.send(stringForm);
    }
    );
});
module.exports = router;