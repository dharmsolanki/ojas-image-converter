import React, { useState } from 'react';
import "../css/Form.css";

export default function Form() {
  const [image, setImage] = useState("");
  const [signature, setSignature] = useState("");
  const [isGrayscale, setIsGrayscale] = useState(false);

  const handleImageChange = (event) => {
    if (event.target && event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      const reader = new FileReader();

      reader.onload = (e) => {
        const dataURL = e.target.result;
        setImage(dataURL);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignChange = (event) => {
    if (event.target && event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      setIsGrayscale(!isGrayscale);

      const reader = new FileReader();

      reader.onload = (e) => {
        const dataURL = e.target.result;
        setSignature(dataURL);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="border border-info border-2 p-4 mb-4">
          <div className="row">
            <div className="col-sm">
              <div className="form-group">
                <label htmlFor="exampleInputName">Upload Photograph</label>
                <input
                  type="file"
                  className="form-control mt-2"
                  id="exampleInputImage"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col">
              <div className="form-group">
                <label htmlFor="exampleInputSign">Upload Signature</label>
                <input
                  type="file"
                  className="form-control mt-2"
                  id="exampleInputSign"
                  accept="image/*"
                  onChange={handleSignChange}
                />
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col">
              <div className="form-group">
                <button className="btn btn-success" style={{ width: "100%" }}>Convert</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="poster">
        {image && (
          <img src={image} alt="" className="uploaded-img" />
        )}

        {signature && (
          <img src={signature} alt="" className={isGrayscale ? "grayscale" : ""} />
        )}
      </div>
    </>
  );
}
