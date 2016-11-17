var express = require('express');
var router = express.Router();


// home page

router.get('/', function (req, res, next) {
    res.end("/listQuizzes\n/getQuiz\n/addQuiz\n/addQuestion\n/addKeyword");
});


// GET requests

router.get('//listQuizzes', function (req, res, next) {
    var db = req.db;
    var collection = db.get('quizapi');
    collection.find({}, {"quiz_name": 1}, function (e, docs) {
        res.send(docs);
    });
});


router.get('//getQuiz', function (req, res, next) {
    if (req.query.hasOwnProperty('quiz')) {
        var db = req.db;
        var collection = db.get('quizapi');
        collection.find({"quiz_name": req.query.quiz}, {}, function (e, docs) {
            res.send(docs);
        });
    } else {
        res.end("Invalid Request: url must be in the form /getQuiz?quiz=quizName. To get a list of valid quizNames use /listQuizzes");
    }
});


// POST requests

router.post('//addQuiz', function (req, res, next) {
    res.end("TODO"); // TODO
});

router.post('//addQuestion', function (req, res, next) {
    res.end("TODO"); // TODO
});

router.post('//addKeyword', function (req, res, next) {
    res.end("TODO"); // TODO
});


// Not used

router.get('//addQuiz', function (req, res, next) {
    res.end("Use POST to add a quiz");
});

router.get('//addQuestion', function (req, res, next) {
    res.end("Use POST to add a question");
});

router.get('//addKeyword', function (req, res, next) {
    res.end("Use POST to add a keyword");
});


module.exports = router;
