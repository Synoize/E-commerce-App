const express = require('express');
const router = express.Router();

const person = require('./../models/person')

//POST person from -->Persons 
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new person(data);

        const savePerson = await newPerson.save();
        console.log("Person Data Saved.");
        res.status(200).json(savePerson)

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error.' })
    }

});


//GET person from -->Persons 
router.get('/', async (req, res) => {
    try {
        const data = await person.find();
        console.log('Data Fetched');
        res.status(200).json(data)

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error.' })
    }
})

//GET person parametrised API calls

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType; //Extract the work type from the URL parameter
        if (workType == 'employee' || workType == 'manager') {
            const data = await person.find({ work: workType });
            console.log('Data Fetched');
            res.status(200).json(data)
        } else {
            res.status(400).json({ error: 'Invalid Work Error.' })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error.' })
    }
})


//PUT(Update) person for -->Persons 
router.put('/:id', async(req, res) =>{
    try{
        const personId = req.params.id; //Extrect the id from the URL parameter
        const updatedPersonData = req.body; //Upadted data for the person

        const data = await person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, //Return the updated document
            runValidation:true //Run Mongoose Validation
        })

        if(!data){
            res.status(404).json({error:'Person not Found'});
        }

        console.log("Data Updated.");
        res.status(200).json(data)

    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error.' })
    }
})

//DELETE person for -->Persons 
router.delete('/:id', async(req,res) =>{
    try{
        const personId = req.params.id; 

        const data = await person.findByIdAndDelete(personId);
        if(!data){
            res.status(404).json({error:'Person not Found'});
        }
    
        console.log("Data Deleted.")
        res.status(200).json({message: 'person deleted sucessfully.'});

    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error.' })
    }
  
})

module.exports = router