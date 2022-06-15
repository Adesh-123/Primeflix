const router=require('express').Router();
const List=require("../models/List")
const verify=require('../Verifytoken');

// create list
router.post("/",verify,async(req,res)=>{
    if(req.user.isAdmin){
        const newlist=new List(req.body);
        try{
            const listsaved=await newlist.save();
            return res.status(200).json(listsaved);
        }
        catch(err){
           return  res.status(500).json(err);
        }
    }
    else{
        return req.status(402).json("you have no permission for adding list");
    }
})

// delete list
router.delete("/:id",verify,async(req,res)=>{
    if(req.user.isAdmin){
        try{
            const deletelist=await List.findByIdAndDelete(req.params.id);
            return res.status(200).json("list has been deleted");
        }
        catch(err){
            return res.status(500).json(err);
        }
    }
    else{
         return res.status(500).json("you have no permission for deleting list");
    }
})


router.get("/", verify, async (req, res) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];
    try {
      if (typeQuery) {
        if (genreQuery) {
          list = await List.aggregate([
            { $sample: { size: 10 } },
            { $match: { type: typeQuery, genre: genreQuery } },
          ]);
        } else {
          list = await List.aggregate([
            { $sample: { size: 10 } },
            { $match: { type: typeQuery } },
          ]);
        }
      } else {
        list = await List.aggregate([{ $sample: { size: 10 } }]);
      }
     return res.status(200).json(list);
    } catch (err) {
      return res.status(500).json(err);
    }
  });

module.exports=router;