const express = require('express');
const router = express.Router();

const person=require('../model/person')

router.post('/', async (req,res)=>{
    try{

        const data= req.body//Assuming that the request body contain the person data

        const newPerson= new person(data);//creating new person document using the mongoose model

        //save new person to the database 
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Service error'});
    }
}) 

router.get('/',async (req,res)=>{
    try{ 
        
        const data = await person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){ 
        console.log(err);
        res.status(500).json({error: 'Internal Service error'}); 
    }
})

router.get('/:worktype',async (req,res)=>{
    try{
        const workType =req.params.worktype;
        if(workType == 'chef' || workType == 'waiter' || workType == 'manager'){
            const response = await person.find({work : workType});
            console.log("response fetched ")
            res.status(200).json(response);
        }else{
            res.status(404).json({error:"Invalid work type"})
        }

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Service error'}); 
    }
})

router.put('/:id',async (req,res)=>{
    try{
        const personId=req.params.id;
        const updatePerson= req.body;

        const response = await person.findByIdAndUpdate(personId,updatePerson, {
            new :true,//return the updated document 
            runValidators :true,//run mongoose validation 
        })

        if(!response){
            return res.status(200).json({error:"Person not found"})
        } 
        console.log('data updated');
        res.status(200).json(response);

    }catch(err){
         console.log(err);
         res.status(500).json({error:'Internal Service error'}); 
    }

})

router.delete('/:id',async (req,res)=>{
    try{
        const personId=req.params.id;
        const response= await person.findByIdAndDelete(personId)

        if(!response){
            return res.status(200).json({error:"Person not found"})
        } 

        console.log('data deleted');
        res.status(200).json({message:'Person deleted succesfully'});
        
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Service error'}); 
    }
})


module.exports=router;
