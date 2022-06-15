import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function WidgetSm() {
  const [newUsers, setNewUsers] = useState([]);

  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/user?new=true", {
          headers: {
            token:
              "Bearer "+JSON.parse(localStorage.getItem("user")).accesstoken,
          },
        });
        // console.log(res.data);
        setNewUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getNewUsers();
  }, []);
  
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map((user) => (
          <li className="widgetSmListItem">
            <img
              src={user.profilePic}
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.email}</span>
            </div>
            <Link to={{pathname:"/user/"+user._id,user:user}} className="widgetSmButton">
              <Visibility className="widgetSmIcon"  />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
