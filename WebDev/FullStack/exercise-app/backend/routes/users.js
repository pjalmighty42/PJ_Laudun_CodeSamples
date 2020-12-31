const router = require('express').Router();
let User = require('../models/user.model');

//if '/users/', GET req
router.route('/').get((req, res) =>{ 
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

//if '/users/add', POST req
router.route('/add').post((req, res) => {
    const userName = req.body.username;
    const newUser = new User({userName});

    newUser.save()
    .then(()=> res.json('User Added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;