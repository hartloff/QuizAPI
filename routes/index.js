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
    collection.find({}, {"quiz_name": 1, "_id": 0, "questions": 0}, function (e, docs) {
        var quizzes = [];
        for (var i in docs) {
            quizzes.push(docs[i].quiz_name);
        }
        res.send(quizzes);
    });
});


router.get('//getQuiz', function (req, res, next) {
    if (req.query.hasOwnProperty('quiz')) {
        var db = req.db;
        var collection = db.get('quizapi');
        collection.find({"quiz_name": req.query.quiz}, {"_id": 0}, function (e, docs) {
            res.send(docs);
        });
    } else {
        res.end("Invalid Request: url must be in the form /getQuiz?quiz=quizName. To get a list of valid quizNames use /listQuizzes");
    }
});


// POST requests

router.post('//addQuiz', function (req, res, next) {
    if (req.body.hasOwnProperty("quiz_name")) {
        var quiz_name = req.body.quiz_name;
        var db = req.db;
        var collection = db.get('quizapi');
        // TODO: Check if quiz exists
        collection.insert({
            "quiz_name": quiz_name,
            "questions": []
        });
    } else {
        res.end("Invalid Request: Send a JSON string with a variable called 'quiz_name' containing the name of your " +
            "quiz. ex: {'quiz_name':'CSE191_midterm'}");
    }
});

router.post('//addQuestion', function (req, res, next) {
    if (req.body.hasOwnProperty("question") && req.body.hasOwnProperty("quiz")) {
        var question = req.body.question;
        var quiz_name = req.body.quiz;
        var db = req.db;
        var collection = db.get('quizapi');
        collection.update({"quiz_name": quiz_name}, {$push: {"questions": question}});
        // TODO: Check if quiz exists
        // TODO: Check if question is properly formatted? Might leave this up to an exception handling lesson when parsing quizzes
    } else {
        res.end("Invalid Request: Send a JSON string with a variable called 'question' containing all the details" +
            " of the question to add and a variable called 'quiz' containing the name of the quiz to modify");
    }
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
