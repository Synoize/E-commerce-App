const express = require('express');
const router = express.Router();

const items = require('./../models/items')

//POST item from -->Items 
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newItems = new items(data)
        const saveItems = await newItems.save();
        console.log("Item Data Saved.");
        res.status(200).json(saveItems)

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error.' })
    }

});

//GET item from -->Items 
router.get('/', async (req, res) => {
    try {
        const data = await items.find();
        console.log("Item Data Fetched.");
        res.status(200).json(data);

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error.' })
    }
})

//GET items parametrised - API calls
router.get('/:itemsType', async (req, res) => {
    try {
        const itemsType = req.params.itemsType; //Extract the items type from the URL parameter
        if (itemsType == 'fashion' || itemsType == 'electronics' || itemsType == 'diy and hardware' || itemsType == 'beauty and personal care' || itemsType == 'tobacco products' || itemsType == 'toys and hobbies' || itemsType == 'grocery') {
            const data = await items.find({ category: itemsType });
            console.log("Items Data Fetched.");
            res.status(200).json(data)
        }else{
            res.status(400).json({ error: 'Invalid Work Error.' })
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error.' });
    }
});


//PUT(Update) item for -->Items 
router.put('/:id', async(req, res) =>{
    try{
        const itemId = req.params.id;
        const updatedItemId = req.body;

        const data = await items.findByIdAndUpdate(itemId, updatedItemId, {
            new:true,
            runValidation:true
        })

        if(!data){
            res.status(404).json({error:'Person not Found'});
        }

        console.log("Data Updated.")
        res.status(200).json(data);

    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error.' });
    }
})

module.exports = router