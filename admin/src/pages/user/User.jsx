import {
  MailOutline,
  PermIdentity,
} from "@material-ui/icons";
import { useRef,useState} from "react";
import axios from "axios"
import {useLocation} from "react-router-dom";
import "./user.css";

export default function User() {
  const location =useLocation();
  const users=location.user;
  const [user,setUser]=useState(users);
  const Useradmin=useRef();
  const handleClick=async()=>{
    const isAdmin=Useradmin.current.value;
    try{
      const res=await axios.put("http://localhost:8000/api/user/"+user._id,{isAdmin},{
        headers:{
          token:"Bearer "+JSON.parse(localStorage.getItem("user")).accesstoken,
        }
      });
      setUser(res.data);
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={user.profilepic || "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.username}</span>
              <span className="userShowUserTitle"></span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">User Detail</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            <span className="userShowTitle">Admin</span>
            <div className="userShowInfo">
              <span className="userShowInfoTitle">{user.isAdmin}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Admin</label>
                <select ref={Useradmin}>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={user.profilepic || "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"}
                  alt=""
                />
              </div>
            </div>
          </form>
          <button className="editbutton" onClick={handleClick}>Update</button>
        </div>
      </div>
    </div>
  );
}
