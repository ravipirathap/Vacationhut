import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  faInstagram,
  faFacebookF,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import Footer from "../User/Footer";
import { textAlign } from "@mui/system";

function UpdatePackage() {
  const { id } = useParams();
  const [previewImages, setPreviewImages] = useState([]);
  const [packageData, setPackageData] = useState({
    package: "",
    description: "",
    details: [],
    images: [],
  });

  useEffect(() => {
    async function fetchPackageData() {
      try {
        const response = await axios.get(`https://vacation-hut-0piq.onrender.com/package/${id}`);
        setPackageData(response.data);
      } catch (error) {
        console.error(error);
        // Handle error here, e.g. show error message to user
      }
    }

    fetchPackageData();
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const details = [];
  
    for (let i = 0; i < 10; i++) {
      const activity = formData.get(`activity-${i}`);
      const cost = formData.get(`cost-${i}`);
      if (activity !== null && cost !== null) {
        details.push({ activity, cost });
      }
    }
  
    const images = document.querySelector("#images").files;
    const imageUrls = [];
    const publicIds = [];
  
    for (const file of images) {
      const { url, public_id } = await uploadImage(file);
      imageUrls.push(url);
      publicIds.push(public_id);
    }
  
    const updatedPackageData = {
      package: formData.get("package"),
      description: formData.get("description"),
      totalprice: formData.get("totalprice"),
      note : formData.get("note"),
      details,
      images: packageData.images.concat(
        imageUrls.map((url, i) => ({
          url,
          public_id: publicIds[i],
        }))
      ),
    };
  
    try {
      const response = await axios.put(`https://vacation-hut-0piq.onrender.com/package/${id}`, updatedPackageData);
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
   alert("Package Update success")
      // Handle success here, e.g. show success message to user
    } catch (error) {
      console.error(error);
      // Handle error here, e.g. show error message to user
    }
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

 

  // packageData.images = imageUrls.map((url, i) => ({
  //   url,
  //   public_id: publicIds[i],
  // }));

  function handleImageChange(event) {
    const input = event.target;
    if (input.files && input.files.length) {
      const previewContainer = document.querySelector("#image-preview");
      previewContainer.innerHTML = ""; // Clear existing previews

      for (const file of input.files) {
        const reader = new FileReader();
        reader.onload = function () {
          const preview = document.createElement("img");
          preview.src = reader.result;
          previewContainer.appendChild(preview);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  return (
    <div>
      <div className="sidebarDash">
        <img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1685439779/logo1111111111-removebg-preview_pnxqde.png" alt="Vacation Hut Logo" style={{width:'250px', height:'150px'}}></img>
          <div style={{paddingTop:'20px', fontSize:'25px', fontFamily: 'Pacifico, cursive', fontWeight:'bold'}}>
            {/* <a href="/dash">Dashboard</a> */}
            <a href="/dash/package">Packages</a>
            <a href="/dash/orders">Booking</a>
            <a href="/dash/users">Users</a>
          </div>
      </div>


    <div className="contentDash" style={{paddingTop:'50px'}}>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h1 style={{ fontFamily: 'Pacifico, cursive', color:'#4E0D0D', fontWeight: 'bold', fontSize:'45px', textAlign:'center'}}>Update Package</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="package" style={{ fontFamily: 'Pacifico, cursive',  fontWeight: 'bold', fontSize:'25px', paddingTop:'20px'}}>Package Name</label>
              <input
                type="text"
                className="form-control"
               
                name="package"
                defaultValue={packageData.package}
                style={{background:'#F0E0DA'}}
              />
            </div>
            <div className="form-group">
              <label htmlFor="package" style={{ fontFamily: 'Pacifico, cursive',  fontWeight: 'bold', fontSize:'25px', paddingTop:'20px'}}>Total price</label>
              <input
                type="Number"
                className="form-control"
               
                name="totalprice"
                defaultValue={packageData.totalprice}
                style={{background:'#F0E0DA'}}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description" style={{ fontFamily: 'Pacifico, cursive',  fontWeight: 'bold', fontSize:'25px', paddingTop:'20px'}}>Description</label>
              <textarea
                className="form-control"
                name="description"
                defaultValue={packageData.description}
                style={{background:'#F0E0DA'}}
              ></textarea>
            </div>
            
            <div className="form-group">
  <label htmlFor="details" style={{ fontFamily: 'Pacifico, cursive',  fontWeight: 'bold', fontSize:'35px', paddingTop:'20px', color:'#4E0D0D', textAlign:'center'}}>Details</label>
  {[...Array(10)].map((_, index) => {
    const existingDetail = packageData.details[index] || { activity: "", cost: "" };
    return (
      <div key={index}>
        <label style={{ fontFamily: 'Pacifico, cursive',  fontWeight: 'bold', fontSize:'25px', paddingTop:'20px'}}> Activity</label>
        <input
          type="text"
          className="form-control"
          name={`activity-${index}`}
          defaultValue={existingDetail.activity}
          style={{background:'#F0E0DA'}}
        /><br></br>
        <label style={{ fontFamily: 'Pacifico, cursive',  fontWeight: 'bold', fontSize:'25px'}}>Cost</label>
        <input
          type="number"
          className="form-control"
          name={`cost-${index}`}
          defaultValue={existingDetail.cost}
          style={{background:'#F0E0DA'}}
        />
        <br></br><br></br>
      </div>
    
    );
  })}
</div>

            <div className="form-group">
              <label htmlFor="images">Images</label>
              <label for="images">Select Images:</label>
          <input
            type="file"
            id="images"
            name="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          <div id="image-preview"></div>

            </div>
            <div style={{paddingTop:'30px', paddingBottom:'20px', textAlign:'center'}}>
            <button type="submit" className="btn btn-primary landbtn">
              Update
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>

</div>


);
}

export default UpdatePackage;    