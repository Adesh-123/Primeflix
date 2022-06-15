import {
  Add,
  PlayArrow,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined,
} from "@material-ui/icons";
import axios from "axios";
import React, { useState,useEffect} from "react";
import "./ListItem.scss";
import {Link} from "react-router-dom"

function ListItem({item, index }) {
  var w=window.innerWidth;
  const [isHovered, setIshovered] = useState(false);
  const [movie,setMovie]=useState();
  const [load,setLoad]=useState(false);

  useEffect(() => {
     const getmoviesdetail=async()=>{
       try{
         const res= await axios.get("http://localhost:8000/api/movies/find/"+item,{
          headers:{
            token:"Bearer " + JSON.parse(localStorage.getItem("user")).accesstoken,
          }
         })
          setMovie(res.data);
          setLoad(true);
          // console.log(res.data);
       }catch(err){
         console.log(err);
       }
     }
     getmoviesdetail();
  }, [item])
  
  return (
      <div
        className={w>=750?"listitem":"listitem_style"}
        style={{left:w>=750 && isHovered && index * 225 - 50 + 2.5 * index}}
        onMouseEnter={() => setIshovered(true)}
        onMouseLeave={() => setIshovered(false)}
      >
        <img
          src={load? movie.img :"https://images.unsplash.com/photo-1607434472257-d9f8e57a643d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bG9hZGluZ3xlbnwwfHwwfHw%3D&w=1000&q=80"}
          alt=""
        />
        {
        isHovered && (
          <>
            <video src={movie.trailer } autoPlay={true} loop />
            <div className="info">
              <div className="icons">
               <Link style={{textDecoration:"none",color:"white"}}  to={{pathname:"/watch",movie:movie}}>
                  <PlayArrow className="icon"/>
               </Link>
              </div>
              <div className="infoTop">
                <span>{movie.duration || "2 hr"}</span>
                <span className="limit">{movie.limit}</span>
                <span>{movie.year}</span>
              </div>
              <div className="desc">
                {movie.desc.substring(0,150)}
              </div>
              <div className="genre">{movie.genre}</div>
            </div>
          </>
        )}
      </div>
  );
}

export default ListItem;
