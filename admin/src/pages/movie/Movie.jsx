import { Link, useLocation } from "react-router-dom";
import "./movie.css";
import { Publish } from "@material-ui/icons";
import axios from "axios"

export default function Movie() {
  const location = useLocation();
  const movie = location.movie;
  // console.log(movie);

  function getPathStorageFromUrl(url){

    const baseUrl = "https://firebasestorage.googleapis.com/v0/b/netflix-52de1.appspot.com/o/items%2F";

    let imagePath = url.replace(baseUrl,"");

    const indexOfEndPath = imagePath.indexOf("?");

    imagePath = imagePath.substring(0,indexOfEndPath);
    
    return imagePath;
}

  const moviestorage= async(id)=>{
    const res=await axios.get("http://localhost:8000/api/movies/find/"+id,{
      headers:{
        token:"Bearer " + JSON.parse(localStorage.getItem("user")).accesstoken,
      }
    });
    // console.log(res);
    console.log(res.data.img);
    const r=getPathStorageFromUrl(res.data.img);
    console.log(r);
  }
  moviestorage(movie._id);
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={movie.img} alt="" className="productInfoImg" />
            <span className="productName">{movie.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{movie._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">{movie.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">year:</span>
              <span className="productInfoValue">{movie.year}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">limit:</span>
              <span className="productInfoValue">{movie.limit}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Movie Title</label>
            <input type="text" placeholder={movie.title} />
            <label>Year</label>
            <input type="text" placeholder={movie.year} />
            <label>Genre</label>
            <input type="text" placeholder={movie.genre} />
            <label>Limit</label>
            <input type="text" placeholder={movie.limit} />
            <label>Trailer</label>
            <input type="file" placeholder={movie.trailer} />
            <label>Video</label>
            <input type="file" placeholder={movie.video} />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src={movie.img}
                alt=""
                className="productUploadImg"
              />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
