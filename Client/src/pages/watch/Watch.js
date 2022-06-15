import { ArrowBackOutlined} from '@material-ui/icons'
import React, { useState} from 'react'
import {Link, useLocation ,useHistory} from 'react-router-dom'
import ReactPlayer from "react-player"
import "./watch.scss"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Watch() {
  const history=useHistory();
  const [arrow,setArrow]=useState(false);
  const location = useLocation();
  const movie = location.movie;


  return (
      <div className="watch">
        <div className="back" onClick={()=>{history.goBack()}}>
          <ArrowBackOutlined />
          Home
        </div>
      <div className="player-wrapper">
      <ReactPlayer
        url={movie.video}
        className="react-player"
        playing
        width="100%"
        height="90%"
        controls={true}
        />
      </div>
      <div className='movie_text'>
        <div>{movie.title}</div>
        {!arrow? <KeyboardArrowDownIcon className='arrow_style' onClick={()=>setArrow(true)}/>:
          <KeyboardArrowUpIcon className='arrow_style' onClick={()=>setArrow(false)}/>
        }
      </div>
      { arrow && 
          <div className='bottom_icons'>
            <div className="text_style">
                <span>Duration-{movie.duration || "2 hr"}</span>
                <span className="limit">Age limit -{movie.limit}</span>
                <span>Release year-{movie.year}</span> 
            </div>
            <div className="desc_style">
              {movie.desc}
            </div>
            <div className="genre_style">Genre- {movie.genre}</div>
        </div>
      }
      <div className='bottom_margin'></div>
    </div>
  )
}

export default Watch