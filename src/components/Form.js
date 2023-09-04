import React, {useState} from 'react'
import "../css/Form.css";

export default function Form() {
  const [image, setImage] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handleSignChange = async (event) => {
    if (event.target && event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
  
      // Use FileReader to read the selected file as a data URL
      const reader = new FileReader();
  
      reader.onload = (e) => {
        // The result contains the data URL representing the selected image
        const dataURL = e.target.result;
        setImage(dataURL);
      };
  
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  return (
    <>
      <h3 className="text-light mt-5">Ojas Image Size Reducer</h3>
      <div className="container mt-5">
      <div class="border border-info border-2 p-4 mb-4">
        <div className="row">
          <div className="col-sm">
            <div className="form-group">
              <label htmlFor="exampleInputName">Name of Birthday Person</label>
              <input
                type="text"
                className="form-control mt-2"
                id="exampleInputName"
                placeholder="Name of Birthday Person"
                value={name}
                onChange={handleNameChange}
              />
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col">
            <div className="form-group">
              <label htmlFor="exampleInputName">Upload Image</label>
              <input
                type="file"
                className="form-control mt-2"
                id="exampleInputImage"
                accept="image/*" // Specify that only image files are allowed
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>

        {/* <div className="row mt-4">
          <div className="col">
            <div className="form-group">
              <label htmlFor="exampleInputDesc">Description</label>
              <textarea className="form-control mt-2" id="exampleTextarea" rows="2" placeholder="Enter Your Birthday Description"></textarea>
            </div>
          </div>
        </div> */}

        <div className="row mt-4">
          <div className="col">
            <div className="form-group">
              <button className="btn btn-success" style={{ width: "100%" }}>Create</button>
            </div>
          </div>
        </div>
      </div>
      </div>

      <div className="poster">
       
       {image && (

         <img src={image} alt="" height="300px" width="290px" className="uploaded-img" />
       )

       }
      </div>
    </>
  );
}
