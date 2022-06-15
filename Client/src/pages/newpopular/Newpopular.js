import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Movie from "../../components/movie/Movie"
import "./newpopular.scss"
import Navbar from "../../components/navbar/Navbar"

function Newpopular() {
  const [movies,setMovies]=useState([]);
  useEffect(()=>{
    const getallmovies=async()=>{
       const res=await axios.get("http://localhost:8000/api/movies",{
           headers:{
               token:"Bearer "+JSON.parse(localStorage.getItem("user")).accesstoken
           }
       })
       console.log(res);
       setMovies(res.data);
    }
    getallmovies();
  },[]);
  

  return (
      <>
        <Navbar/>
        <div className='top_box'></div>
        <div className='newpopular_box'>
            {/* <h1 className='heading'>NEW and popular movie</h1> */}
            <div className='movies_list'>
                {movies.map((movie,index)=>(
                    <Movie key={index} index={index} movie={movie}/>
                ))}
            </div>
        </div>
        <div style={{height:"100px",width:"100%",backgroundColor:"black",marginTop:"-2px"}}></div>
      </>
  )
}

export default Newpopular