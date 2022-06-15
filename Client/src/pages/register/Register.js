import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import {useHistory } from "react-router-dom";
import logo from "../../images/Prime.png"
import "./register.scss";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";


export default function Register() {
  let user=null;
  const [email, setEmail] = useState("");
  const [file,setFile]=useState(null);
  const history = useHistory();

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };
  const handleFinish = async (e) => {
    e.preventDefault();
    const username=usernameRef.current.value;
    const password=passwordRef.current.value;

    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

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
          // console.log({email,password,username,downloadURL});
          user={email,password,username,profilepic:downloadURL}
          // console.log(user);
          registeruser();
        });
      }
    );        
  };
  const registeruser = async()=>{
    try {
      console.log(user);
      const res= await axios.post("http://localhost:8000/api/auth/register", user);
      console.log(res);
      history.push("/login");
    } catch (err) {
      setEmail("");
    }
  }

  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src={logo}
            alt=""
          />
            {/* <button className="loginButton" >Sign In</button> */}
        </div>
      </div>
      <div className="container">
        <h1>Watch Movie and series</h1>
        <h2>Watch anywhere</h2>
        <p>
           Enter your email to create your account.
        </p>
        {!email ? (
          <div className="input" >
            <input type="email" placeholder="email address" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="second_page">
            <input type="file" id="file" onChange={(e)=> setFile(e.target.files[0])}/>
            <input type="username" placeholder="username" ref={usernameRef} />
            <input type="password" placeholder="password" ref={passwordRef} />
            <button className="registerButton" onClick={handleFinish}>
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
