var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
    res.end("/listQuizzes\n/getQuiz\n/addQuiz\n/addQuestion\n/addKeyword");
});


router.get('//listQuizzes', function (req, res, next) {

    var db = req.db;
    var collection = db.get('quizapi');
    collection.find({}, {}, function (e, docs) {
        //res.render('stuff', {
        //    "stuff": docs
        //});
        res.end(docs);
    });
});


router.get('//getQuiz', function (req, res, next) {
    if (req.query.hasOwnProperty('quiz')) {
        res.end("{" + req.query.quiz + "}");
    } else {
        res.end("You done bad");
    }
    res.end("TODO"); // TODO
});


router.post('//addQuiz', function (req, res, next) {
    res.end("TODO"); // TODO
});

router.post('//addQuestion', function (req, res, next) {
    res.end("TODO"); // TODO
});

router.post('//addKeyword', function (req, res, next) {
    res.end("TODO"); // TODO
});


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
