import { Search, ArrowDropDown} from '@material-ui/icons';
import React,{useState,useContext} from 'react'
import "./Navbar.scss"
import { Link, NavLink } from "react-router-dom";
import {AuthContext} from "../../authContext/AuthContext"
import {logout} from "../../authContext/AuthActions"
import { FaBars } from 'react-icons/fa';
import CloseIcon from '@mui/icons-material/Close';
import {useLocation} from "react-router-dom"
import logo from "../../images/Prime.png"


function Navbar() {
  const location =useLocation();
  const path=location.pathname;
  // const [linkclick,setLinkclick] =useState(false);
  const [click,setClick]=useState(false);
  const [scroll, setScroll] = useState(false);
  const {dispatch}=useContext(AuthContext);
  const user=JSON.parse(localStorage.getItem("user"));
  const handlelinkclick=()=>{
    setClick(false);
  }

  const handleClick=(e)=>{
    e.preventDefault();
    setClick(!click);
  }

  window.onscroll=()=>{
    setScroll(window.pageYOffset===0?false:true);
    return ()=>(window.onscroll=null);
  }
  return (
    <div className={scroll?"navbar scrolled":"navbar"}>
      {!click?<div className='container'>
            <img className="logo_style" src={logo} alt=""/>
            <div className='left'>
              <img src={logo} alt=""/>
              <NavLink to="/" className='link' style={{color:path==='/'?"aqua":"white"}}>
                 <span>Homepage</span>
              </NavLink>
              <NavLink to="/series" className='link'>     
                <span>series</span>
              </NavLink>
              <NavLink to="/movies" className='link'>     
                <span>movies</span>
              </NavLink>
              <NavLink to="/newpopular" className='link'>  
                <span>new and popular</span>
              </NavLink>
            </div>
            <div className='right'>
               {/* <Search  className="icon"/> */}
               <img src={user.profilepic || "https://www.mockofun.com/wp-content/uploads/2019/12/circle-profile-pic.jpg" }alt=""/>
               <div className='profile'>
                   <ArrowDropDown  className="icon"/>
                   <div className='option'>
                     <Link style={{textDecoration:"none",color:"white"}} to="/profile">    
                          <span>Profile</span>
                     </Link>
                     <span onClick={()=>dispatch(logout())}>Logout</span>
                   </div>
               </div>
            </div>
              <FaBars className='bars' onClick={handleClick}/>
        </div>
        :<div className='downbar'>
          <div className='top_bar'>
            <img className="logo_style" src={logo} alt=""/>
            <CloseIcon className='bars' onClick={handleClick}/>
          </div>
          <div className='navlink'>
              <NavLink onClick={handlelinkclick} to="/" className='link' style={{color:path==='/'?"aqua":"white",marginTop:"15px"}} >
                 <span>Homepage</span>
              </NavLink>
              <NavLink onClick={handlelinkclick} to="/series" className='link'>     
                <span>series</span>
              </NavLink >
              <NavLink onClick={handlelinkclick} to="/movies" className='link'>     
                <span>movies</span>
              </NavLink>
              <NavLink onClick={handlelinkclick} to="/newpopular" className='link'>  
                <span>new and popular</span>
              </NavLink>
              <NavLink onClick={handlelinkclick} style={{textDecoration:"none",color:"white"}} to="/profile">    
                    <span>Profile</span>
              </NavLink>
               <span onClick={()=>dispatch(logout())}>Logout</span>
           <div>
          </div>
        </div>
        </div>
          }     
    </div>
  )
}

export default Navbar;