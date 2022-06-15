import React,{useEffect} from "react";
import "./topbar.css";
import {AuthContext} from "../../context/authContext/AuthContext"
import {logout} from "../../context/authContext/AuthActions"
import { useContext } from "react";
import { useHistory } from "react-router-dom";


export default function Topbar() {
  const user=JSON.parse(localStorage.getItem("user"));
  
  const {dispatch}=useContext(AuthContext);
  const history=useHistory();
 const handlelogout=()=>{
    dispatch(logout())
    history.push("/login");
 }

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Admin Dashboard</span>
        </div>
        <div className="topRight">
          <span className="LogoutButton" onClick={handlelogout}> 
            Logout
          </span>
          <img src={user.img} alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
