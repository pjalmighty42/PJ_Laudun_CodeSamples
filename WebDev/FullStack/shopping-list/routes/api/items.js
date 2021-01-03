const { response } = require('express');
const express = require('express');
const router = express.Router();

//Item model
const Item = require('../../models/Item');

// @route GET api/items
// @desc Get All Items
// @access Public
router.get('/', (req, res) => {
    Item.find()
    .sort({ date: -1 }) //Desc sort
    .then(items => res.json())
    .catch(err => console.log(err));
});

// @route POST api/items
// @desc Create an Item
// @access Public
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save()
    .then(item => res.json(item))
    .catch(err => console.log(err));
});

// @route DELETE api/items/:id
// @desc Delete an Item
// @access Public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success: true})))
    .catch(err => res.status(400).json({success: false}));
});

module.exports = router;