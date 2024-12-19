import React, { useState, useEffect } from "react";
import "../../App.css";
// import image from "./imageload.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../User/Footer";
import ResponsiveDashBar from "./Dashboardnav";



function Updateactivity() {
  const { id } = useParams();
  const [images, setImages] = useState(null);
  // const [activity, setActivity] = useState({});
  const [activityname, setActivityName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  
  const [data, setData] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    fetch(`https://vacation-hut-0piq.onrender.com/dash/activity/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        setActivityName(data.data.activityname);
        setDescription(data.data.description);
        setPrice(data.data.price);
        
      });
  }, []);
  async function submit(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("activityname", activityname);
      formData.append("description", description);
      formData.append("price", price);
      if (images) {
        const { public_id, url } = await uploadImage(images);
        formData.append("public_id", public_id);
        formData.append("url", url);
      }
    
    
      await axios.put(`https://vacation-hut-0piq.onrender.com/dash/activity/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Navigate("/dash/activity");
    } catch (error) {
      console.log(error);
    }
  }
  
  function handleImageChange(e) {
    const file = e.target.files[0];
    setImages(file);
  }
  async function uploadImage(file) {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(
      "https://vacation-hut-0piq.onrender.com/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }

  return (
    <div className="App">
      <ResponsiveDashBar/>
      <div>
        <h1 className="activity">Update activity</h1>
        <div className="flex-container">
          <div className="flex-item-left">
          <h3 className="headfont">
              <i>
                <u>Activity details</u>
              </i>
            </h3>

            <form className="form">
              {/* {data.map(i =>{
              
              return ( */}

              <label>Activity Name</label>
              <br></br>
              <input
                value={activityname}
                onChange={(e) => {
                  setActivityName(e.target.value);
                }}
              ></input>
              <br></br>
              <label className="label2">Description</label>
              <br />
              <input
                name="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <br />
              <label className="label3">Price</label>
              <br></br>

              <input
                name="price"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              >
              </input>
              <br></br>
            
             
            </form>
          </div>
          <div className="flex-item-right">
            <h3 className="headfont">
              <i>
                <u>Activity Image</u>
              </i>
            </h3>
            {images ? (
              <img
                src={URL.createObjectURL(images)}
                alt="Selected Image"
                className="addimg"
              />
            ) : (
              <img
                src="https://res.cloudinary.com/dtbqcm3e2/image/upload/v1681897067/Activities/imageload_lubost.png"
                alt="Default Image"
                className="addimg"
              />
            )}
            <br />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setImages(e.target.files[0]);
              }} // call the handleImageChange function on change event
            />
          </div>
        </div>
        <button className="btn2" onClick={submit}>
          <Link to="/dash/activity" className="btn">
            Update activity
          </Link>
        </button>
        <button className="btn2" onClick={submit}>
          <Link to="/dash/activity" className="btn">
            Cancel
          </Link>
        </button>
      </div>
      <Footer/>
    </div>
  );
}

export default Updateactivity;
