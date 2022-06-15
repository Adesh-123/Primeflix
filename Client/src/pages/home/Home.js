import React, { useState,useEffect } from 'react'
import Feature from '../../components/feature/Feature'
import List from '../../components/list/List'
import Navbar from '../../components/navbar/Navbar'
import "./Home.scss"
import axios from "axios"

function Home({type}) {
  const [lists,setLists]=useState([]);
  const [genre,setGenre]=useState(null);

  useEffect(() => {
     if(type===undefined) setGenre(null);

     const getRandomlist=async()=>{
       try{
        const res = await axios.get(
          `http://localhost:8000/api/lists/${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,{
           headers:{
             token:"Bearer " + JSON.parse(localStorage.getItem("user")).accesstoken,
           }
         });
         setLists(res.data);
       }catch(err){
         console.log(err);
       }
     }
      getRandomlist();
  }, [type,genre])
  // console.log(JSON.parse(localStorage.getItem("user")).accesstoken);
  return (
    <div className="home">
        <Navbar/>
        <Feature type={type} setGenre={setGenre}/>
        {lists.map((list,i)=>(
           <List list={list} key={i}/>
        ))}
        <div style={{width:"100%",height:"50px",backgroundColor:"#0b0b0b"}}></div>
    </div>
  )
}

export default Home