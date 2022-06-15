import React, { useState,useContext } from 'react'
import "./profile.scss"
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import axios from "axios";
import {AuthContext} from "../../authContext/AuthContext"
import {logout} from "../../authContext/AuthActions"
import {useHistory} from "react-router-dom"
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';


function Profile() {
  const history= useHistory();
  const {dispatch}=useContext(AuthContext);
  const [edit,setEdit]=useState(false);
  const user=JSON.parse(localStorage.getItem("user"));
  const [profilepic,setprofilepic]=useState(null);
  const [name,setName]=useState("");
  const [err,setErr]=useState(false);
  const handleClick=(e)=>{
    e.preventDefault();
    if(profilepic!==null){
    const fileName = new Date().getTime() + profilepic.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, profilepic);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setprofilepic(downloadURL);
        });
      }
    );      
    }
  }
  console.log(err);
  const handleSubmit=async()=>{
          if(name===""){
            setErr(true);
            return;
          }
          else setErr(false);
          let updateuser;
           try{
                updateuser= await axios.put(`http://localhost:8000/api/user/${user._id}`,{username:name,profilepic:profilepic},{
                  headers:{
                   token:"Bearer " + JSON.parse(localStorage.getItem("user")).accesstoken
                 }
                });
               console.log(updateuser);
               dispatch(logout())
               history.push("/login");
              }catch(err){
                console.log(err)
              }
              console.log({username:name,profilepic:profilepic});
    }
    return (
      <div className='profile_box'>
        <button className='back_button' onClick={()=>{history.push("/")}}><span></span>Back</button>
        {!edit?(<div className='container_profile'>
               <div className='container_top'>
                  <img src={user.profilepic} alt=""/>
                  <ModeEditOutlineIcon className='edit_icon' onClick={()=>setEdit(true)}/>
                </div>
                <div className='username'><span >Username- </span>{user.username}</div>
                {/* <button onClick={()=>setEdit(true)}>Edit</button>  */}
            </div>):
            (<div className='container_profile'>
            <div className='container_top'>
              <img src={profilepic || user.profilepic} alt=""/>
              <div>
                <input type="file" onChange={(e)=> setprofilepic(e.target.files[0])}/>
                <button onClick={handleClick}>Upload</button>
              </div>
            </div>
            <div className='text_username'>Username <span style={{color:"red"}}>{err && <div>require</div>}</span></div>
            <input type="text" placeholder={user.username} onChange={(e)=>{setName(e.target.value)}}/>
            <button className='update_button' onClick={handleSubmit}>Update</button> 
          </div>)
        }
      </div>
  )
}

export default Profile