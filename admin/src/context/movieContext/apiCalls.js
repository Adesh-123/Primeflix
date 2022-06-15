import axios from "axios";
import {
  createMovieFailure,
  createMovieStart,
  createMovieSuccess,
  deleteMovieFailure,
  deleteMovieStart,
  deleteMovieSuccess,
  getMoviesFailure,
  getMoviesStart,
  getMoviesSuccess,
} from "./MovieActions"

export const getMovies = async (dispatch) => {
  dispatch(getMoviesStart());
  try {
    const res = await axios.get("http://localhost:8000/api/movies", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accesstoken,
      },
    });
    dispatch(getMoviesSuccess(res.data));
  } catch (err) {
    dispatch(getMoviesFailure());
  }
};

//create
export const createMovie = async (movie, dispatch) => {
  dispatch(createMovieStart());
  try {
    const res = await axios.post("http://localhost:8000/api/movies", movie, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accesstoken,
      },
    });
    dispatch(createMovieSuccess(res.data));
  } catch (err) {
    dispatch(createMovieFailure());
  }
};

// delete function
// const deleteing=(file)=>{
//   var desertRef = storageRef.child('images/desert.jpg');

// // Delete the file
// desertRef.delete().then(() => {
//   console.log("delted succesfully");
// }).catch((err) => {
//   console.log(err);
// });
// }

// function getPathStorageFromUrl(url){

//   const baseUrl = "https://firebasestorage.googleapis.com/v0/b/netflix-52de1.appspot.com/o/items%2F";
//   let imagePath = url.replace(baseUrl,"");
//   const indexOfEndPath = imagePath.indexOf("?");
//   imagePath = imagePath.substring(0,indexOfEndPath); 
//   return imagePath;
// }

// delete moviestorage from firebase
// const moviestorage= async(id)=>{
//   const res=await axios.get("http://localhost:8000/api/movies/find/"+id,{
//     headers:{
//       token:"Bearer " + JSON.parse(localStorage.getItem("user")).accesstoken,
//     }
//   });
//   // console.log(id);
//   deleteing(getPathStorageFromUrl(res.data.img));
//   deleteing(getPathStorageFromUrl(res.data.imgTitle));
//   deleteing(getPathStorageFromUrl(res.data.imgSm));
//   deleteing(getPathStorageFromUrl(res.data.trailer));
//   deleteing(getPathStorageFromUrl(res.data.video));
// }


//delete
export const deleteMovie = async (id, dispatch) => {
  dispatch(deleteMovieStart());
  try {
    // moviestorage(id);
    await axios.delete("http://localhost:8000/api/movies/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accesstoken,
      },
    });
    dispatch(deleteMovieSuccess(id));
  } catch (err) {
    dispatch(deleteMovieFailure());
  }
};
