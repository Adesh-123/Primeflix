import { useContext, useState } from "react";
import { login } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";
import { useHistory } from "react-router-dom";
import logo from "../../images/Prime.png"
import "./signin.scss";
import axios from "axios"

export default function Login() {
  const [errmessage ,setErrmessage]=useState();
  const [confirmpass,setConfirmpass]=useState("");
  const [updatepass,setUpdatepass]=useState(false);
  const [otp,setOtp]=useState();
  const [otpprocess,setOtpprocess]=useState(false);
  const [forgetpass,setForgetpass]=useState(false);
  const history =useHistory();
  const [err,setErr]=useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AuthContext);
  
  const handleForget=()=>{
    setPassword("");
    setForgetpass(true);
  }
  const handleOtp=async()=>{
    try{
      const res=await axios.post("http://localhost:8000/api/user/otpsend",{email});
      console.log(res);
      setOtpprocess(true);
      setErr(false);
    }catch(err){
      if(err.response.data==="noUser"){
         setErr(true);
         setErrmessage("no such user");
      }
      console.log(err.response);
    }
  }
  const handleVerify=async()=>{
        // apicall and verify otp data;
        try{
          const res=await axios.post("http://localhost:8000/api/user/otpchecker",{email,otp});
          setUpdatepass(true);
          setErr(false);
          setConfirmpass("");
        }catch(err){
          if(err.response.data==="Notmatched"){
            setErr(true);
            setErrmessage("Notmatched");
          }
          console.log(err);
        }
  }
  const handleUpdate=async()=>{
    if(password===""){
      setErr(true);
      setErrmessage("*required");
    }
    else if(password===confirmpass){
      // api call to update pass;
      try{
        const res=await axios.put("http://localhost:8000/api/user/update/forget",{email,password});
        setForgetpass(false);
        setOtpprocess(false);
        setUpdatepass(false);
        setOtp("");
        setPassword("");
        setConfirmpass("");
        setEmail("");
        setErr(false);
      }catch(err){
        setErr(true);
        setErrmessage("password not matched");
        return;
      }
    }
    else {
      setErr(true);
    }
  }

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
    const user=JSON.parse(localStorage.getItem("user"));
    if(user===null) setErr(true);
  };
  const handleClick=()=>{
    history.push("/register");
  }
  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src={logo}
            alt=""
          />
        </div>
      </div>
      {
        !forgetpass? (      
        <div className="container">
        <form>
          <h1>Sign In</h1>
          <div style={{color:"red",fontWeight:"bold",marginBottom:"-5px",fontSize:"12px"}}>{err && <div>No such user exists</div>}</div>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div onClick={handleForget}>Forget password?</div>
          <button className="loginButton" onClick={handleLogin}>
            Sign In
          </button>
          <h3 className="orclass">or</h3>
          <button className="loginButton" onClick={handleClick}>
            Register
          </button>
          <span>
            New to StarFix? <b>Register now.</b>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.
          </small>
        </form>
        </div>):(
          !updatepass?(
            <div className="container">
            <div className="container_style">
              <div>Email</div>
              {err && <div style={{color:"red",fontWeight:"bold",marginBottom:"-10px",fontSize:"13px"}}>{errmessage}</div>} 
              <input type="email"
                placeholder={email!==""?email:"Enter Email"}
                onChange={(e) => setEmail(e.target.value)}/>
              {otpprocess && <input type="text" inputMode="numeric" placeholder="Enter OTP" onChange={(e)=>setOtp(e.target.value)}/>}
              {!otpprocess?<button onClick={handleOtp}>Send OTP</button>
                :<button onClick={handleVerify}>Verify</button>}
             </div>
            </div>
          ):<div className="container">
            <div className="container_style">
               <div>Password</div>
               {err && errmessage==="*required" && <div  style={{color:"red",fontWeight:"bold",marginBottom:"-5px",fontSize:"12px"}}>{errmessage}</div>}
                <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                />
                <div style={{marginTop:"5px"}}>Confirm Password</div>
                {err && errmessage==="password not matched" && <div  style={{color:"red",fontWeight:"bold",marginBottom:"-5px",fontSize:"12px"}}>{errmessage}</div>}
                <input
                type="password"
                placeholder="confirm Password"
                onChange={(e) => setConfirmpass(e.target.value)}
                />
              <button onClick={handleUpdate}>Update</button>
            </div>  
          </div>
        )
      }

    </div>
  );
}
