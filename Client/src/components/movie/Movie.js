import React, { useState } from 'react'
import {Link} from "react-router-dom"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import "./movie.scss"

function Movie({movie}) {
  const [isHovered,setIshovered]=useState(false);
  return (
    <div className="movie_box"
    onMouseEnter={() => setIshovered(true)}
    onMouseLeave={() => setIshovered(false)}>
      <Link to={{pathname:"/watch",movie:movie}}> 
         <img
          style={{opacity:isHovered?0.5:1}}
          src={ movie.img || "https://images.unsplash.com/photo-1607434472257-d9f8e57a643d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bG9hZGluZ3xlbnwwfHwwfHw%3D&w=1000&q=80"}
          alt=""
          />
          <div style={{opacity:isHovered?0.5:1}}>{movie.title}</div>
          <div  className='play_icon' style={{display:isHovered?"block":"none"}}>
            <PlayArrowIcon className='icon_style'/>
          </div>
      </Link>
      </div>
  )
}

export default Movie