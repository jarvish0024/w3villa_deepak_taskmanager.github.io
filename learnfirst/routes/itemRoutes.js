const express = require('express');
const router = express.Router();
const Task = require('../models/Item');

router.post('/adds', async ( req, res) => {
    try {
        const { name, status, description } = req.body;
        const newItem = new Task({ name, status, description});
        await newItem.save();
        res.status(201).json(newItem);
    } catch ( error ){
        res.status(500).json({ message: 'Error creating Item', error });
    }
});



////Read all the data

router.get('/', async ( req, res) => {
    try{
        const items = await Task.find();
        res.status(200).json(items);
    } catch (error){
        res.status(500).json({ message: 'Error fetching the item', error});
    }
});


///// update the data

router.put('/:id', async ( req, res) => {
    try{
        const { name, status, description } = req.body;
        const updatedItem = await Task.findByIdAndUpdate(
            req.params.id,
            { name, status, description},
            { new: true}
        );
        if(!updatedItem) return res.status(404).json({ message: 'Item not found'});
        res.status(200).json(updatedItem);
    } catch ( error){
        res.status(500).json({ message: 'Error updating Item', error });
    }
});

///// delete the item

 
router.delete('/:id', async ( req, res) => {
    try{
        const deletedItem = await Task.findByIdAndDelete(req.params.id);
        if(!deletedItem) return res.status(404).json({ message: 'Item Not Found'});
    } catch ( error ){
        res.status(500).json({ message: 'Error deleting item', error });
    }
});

module.exports = router;