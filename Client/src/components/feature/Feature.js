import { InfoOutlined, PlayArrow } from '@material-ui/icons'
import React, { useState,useEffect } from 'react'
import "./Feature.scss"
import axios from 'axios';
import {Link} from "react-router-dom"

function Feature({type,setGenre}) {
  const [content, setContent]=useState({});
   useEffect(() => {
     const getrandommovie=async()=>{
       try{
          const res=await axios.get(`http://localhost:8000/api/movies/random?type=${type}`,{
            headers:{
              token:"Bearer " + JSON.parse(localStorage.getItem("user")).accesstoken,
            }
          });
          res.data[0].desc=res.data[0].desc.substring(0,200);
          setContent(res.data[0]);
       }catch(err){
           console.log(err)
       }
     }
     getrandommovie();
   }, [type])
  return (
    <div className='feature'>
      {type && (
        <div className='category'>
            <span onChange={(e)=>setGenre(e.target.value)}>{type==="movie"?"Movies":"series"}</span>
            <select onChange={(e)=>setGenre(e.target.value)} name="genre" id="genre">
              <option>Genre</option>
              <option value="adventure">Adventure</option>
              <option value="comedy">Comedy</option>
              <option value="crime">Crime</option>
              <option value="action">Action</option>
              <option value="historical">Historical</option>
              <option value="horror">Horror</option>
              <option value="romance">Romance</option>
              <option value="sci-fi">Sci-fi</option>
          </select>
        </div>
      )}
        <img src={content.img} alt=""/>
        <div className='info'>
           <h1 className='title_text'>{content.title}</h1>
           <span className='desc'>
               {content.desc}<span>...</span>
           </span>
           <div className='buttons'>
           <Link style={{textDecoration:"none"}}  to={{pathname:"/watch" ,movie:content}}>
             <button className='play'>
               <PlayArrow className='icon_style'/>
               <span>play</span>
             </button>
           </Link>
           {/* <Link style={{textDecoration:"none"}} to={{pathname:"/watch" ,movie:content}}>
             <button className='more'>
               <InfoOutlined className='icon_style'/>
               <span>more</span>
             </button>
           </Link> */}
           </div>
        </div>
    </div>
  )
}

export default Feature