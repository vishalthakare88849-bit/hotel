const express = require('express');
const router = express.Router();

const menuItem =require('../model/MenuItem')



router.post('/', async (req,res)=>{
    try{

        const data= req.body//Assuming that the request body contain the person data

        const newMenuItem= new menuItem(data);//creating new person document using the mongoose model

        //save new person to the database 
        const response = await newMenuItem.save();
        console.log('Menu saved');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Service error'});
    }
})  


router.get('/', async (req,res)=>{
    try{ 
        const data = await menuItem.find();
        console.log('menu fetched');
        res.status(200).json(data);
    }catch(err){ 
        console.log(err);
        res.status(500).json({error: 'Internal Service error'}); 
    }
})


router.get('/:tastetype', async (req,res)=>{
    try{
        const tasteType = req.params.tastetype;
        if(tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour'){
            const response = await menuItem.find({taste:tasteType})
            console.log('menu fetched');
            res.status(200).json(response);

        }else{
            res.status(404).json({error:'Invaild tastetype'})

        }

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Service error'}); 
    }
})

router.put('/:id',async (req,res)=>{
    try{
        const menuId=req.params.id;
        const updateMenu= req.body;

        const response = await menuItem.findByIdAndUpdate(menuId,updateMenu, {
            new :true,//return the updated document 
            runValidators :true,//run mongoose validation 
        })

        if(!response){
            return res.status(200).json({error:"Menu not found"})
        } 
        console.log('Menu updated');
        res.status(200).json(response);

    }catch(err){
         console.log(err);
         res.status(500).json({error:'Internal Service error'}); 
    }

})

router.delete('/:id',async (req,res)=>{
    try{
        const MenuId = req.params.id;
        const response = await menuItem.findByIdAndDelete(MenuId)

        if(!response){
            return res.status(200).json({error:"Menu not found"})
        } 

        console.log('data deleted');
        res.status(200).json({message:'Menu deleted succesfully'});
        
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Service error'}); 
    }
})

module.exports=router;




