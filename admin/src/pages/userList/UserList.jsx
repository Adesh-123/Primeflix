import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import {DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios"

export default function UserList() {
  const [data, setData] = useState([]);

  const handleDelete = (id) => {
     const deleteuser=async()=>{
       try{
         await axios.delete("http://localhost:8000/api/user/"+id,{
           headers:{
             token:"Bearer " + JSON.parse(localStorage.getItem("user")).accesstoken,
           }
         })
         setData([]);
       }
       catch(error){
         console.log(error);
       }
     }
    deleteuser();
  };

  useEffect(() => {
     const getalluser=async()=>{
       try{
         const res= await axios.get("http://localhost:8000/api/user",{
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accesstoken,
          },
        })
         setData(res.data);
        }
        catch(error){
          console.log(error);
        }
      }
      getalluser();
    }, [data])  
  
  const columns = [
    { field: "_id", headerName: "ID", width: 290 },
    {
      field: "username",
      headerName: "Username",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.profilepic ||"https://www.mockofun.com/wp-content/uploads/2019/12/circle-profile-pic.jpg"} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 250 },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 120,
    // },
    // {
    //   field: "transaction",
    //   headerName: "Transaction Volume",
    //   width: 160,
    // },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link  to={{ pathname: "/user/" + params.row._id,user:params.row}}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}
