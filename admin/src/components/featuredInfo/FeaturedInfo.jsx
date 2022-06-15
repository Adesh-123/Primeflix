import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import axios from "axios"
import { useEffect } from "react";
import { useState } from "react";

export default function FeaturedInfo() {
  const [totaluser,setTotaluser] =useState();
  const [totalmovie,setTotalmovie] =useState();

  useEffect(() => {
    const getalluser = async()=>{
      const res=await axios.get("http://localhost:8000/api/user",{
        headers:{
          token: "Bearer "+ JSON.parse(localStorage.getItem("user")).accesstoken
        }
      })
      setTotaluser(res.data.length);
    }
    const getallmovie=async()=>{
      const res=await axios.get("http://localhost:8000/api/movies",{
        headers:{
          token: "Bearer "+ JSON.parse(localStorage.getItem("user")).accesstoken
        }
      })
      setTotalmovie(res.data.length);
    }
    getalluser();
    getallmovie();
  }, [])
  
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Total user</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{totaluser}</span>
          <span className="featuredMoneyRate">
          </span>
        </div>
        <span className="featuredSub">register in website</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Movies</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{totalmovie}</span>
          <span className="featuredMoneyRate">
          </span>
        </div>
        <span className="featuredSub">total movie on the website</span>
      </div>
    </div>
  );
}
