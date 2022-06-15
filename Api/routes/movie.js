const router=require('express').Router();
const Movie=require("../models/Movie")
const verify=require('../Verifytoken');

// create movie
router.post("/",verify,async(req,res)=>{
    if(req.user.isAdmin){
        const moviecreated=new Movie(req.body);
        try{
           const movieadded= await moviecreated.save();
           return res.sendStatus(200).json(movieadded);
        }
        catch(err){
           return  res.status(500).json(err);
        }
    }
    else{
        return res.status(402).json("you are no permission for adding movie");
    }
})

// update movie
router.put("/:id",verify,async(req,res)=>{
    if(req.user.isAdmin){
        try{
            const updatemovie=await Movie.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
            return res.status(200).json(updatemovie);
        } 
        catch(err){
            return res.status(500).json(err);
        }
    }
    else{
        return res.status(402).json("you have no permission for updaing movie");
    }
})

// delete movie
router.delete("/:id",verify,async(req,res)=>{
    if(req.user.isAdmin){
        try{
           const deletemovie=await Movie.findByIdAndDelete(req.params.id);
           return res.status(200).json(deletemovie);
        }catch(err){
           return res.status(500).json(err)
        }
    }
    else{
        return res.status(402).json("You have no permission for delete the movie");
    }
})

// get movie 
router.get("/find/:id",verify,async(req,res)=>{
    try{
       const moviedetail=await Movie.findById(req.params.id);
       return res.status(200).json(moviedetail);
    }catch(err){
       return res.status(500).json(err);
    }
})

// get random movie
router.get("/random", verify, async (req, res) => {
    const type = req.query.type;
    let movie;
    try {
      if (type === "series") {
        movie = await Movie.aggregate([
          { $match: { isSeries: true } },
          { $sample: { size: 1 } },
        ]);
      } else {
        movie = await Movie.aggregate([
          { $match: { isSeries: false } },
          { $sample: { size: 1 } },
        ]);
      }
       return res.status(200).json(movie);
    } catch (err) {
      return res.status(500).json(err);
    }
  });

// get all movies
router.get("/",verify,async(req,res)=>{
    // if(req.user.isAdmin){
        try{
            const allmovies=await Movie.find();
            return res.status(200).json(allmovies.reverse());
        }
        catch(err){
            return res.status(500).json(err);
        }
    // }
    // else{
    //     return res.status(402).json("You have no permission to see movies list");
    // }
})

module.exports=router;