import React, { useState, useRef } from "react";
import { Link } from 'react-router-dom';
import "../css/Form.css";

export default function Form() {
  const [image, setImage] = useState("");
  const [sign, setSign] = useState("");
  const [showImg, setShowImg] = useState(false);
  const [imgHeight] = useState("188.98px");
  const [imgWidth] = useState("136.06px");
  const [signHeight] = useState("94.5px");
  const [signWidth] = useState("283.46px");
  const imageRef = useRef(null);
  const signRef = useRef(null);

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

      // Load the selected image
      image.src = URL.createObjectURL(file);
    };
  };

  const handleConvert = () => {
    setShowImg(true);
  };

  const handleDownloadImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = parseInt(imgWidth, 10);
    canvas.height = parseInt(imgHeight, 10);
    ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);

    // Convert the canvas to a data URL and create a download link for the photograph
    const dataURL = canvas.toDataURL("image/jpeg"); // You can adjust the format if needed
    const downloadLink = document.createElement("a");
    downloadLink.href = dataURL;
    downloadLink.download = "photograph.jpg"; // Set the desired file name

    // Trigger a click event to download the image
    downloadLink.click();
  };

  const handleDownloadSign = () => {
    // Create a new canvas element
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions based on signHeight and signWidth
    canvas.width = parseInt(signWidth, 10);
    canvas.height = parseInt(signHeight, 10);

    // Apply the grayscale filter
    ctx.filter = "grayscale(100%)";

    // Draw the signature image onto the canvas
    ctx.drawImage(signRef.current, 0, 0, canvas.width, canvas.height);

    // Convert the canvas to a data URL and create a download link for the black and white signature
    const dataURL = canvas.toDataURL("image/jpeg"); // You can adjust the format if needed
    const downloadLink = document.createElement("a");
    downloadLink.href = dataURL;
    downloadLink.download = "sign.jpg"; // Set the desired file name

    // Trigger a click event to download the black and white signature
    downloadLink.click();
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
                <button
                  className="btn btn-success"
                  style={{ width: "100%" }}
                  onClick={handleConvert}
                >
                  Convert
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-success p-4 text-light instruction">
        <p>
          Welcome to Ojas Image and Signature Resizer – Your Go-To Tool for
          Image and Signature Optimization. Whether you're applying for a job,
          filling out important documents, or simply need to resize and enhance
          your photos and signatures, we've got you covered.
        </p>
      </div>

      <h4 className="text-light mt-2">
      This Image Resizer is Design only For{' '}
      <Link to="https://ojas.gujarat.gov.in/" style={{ textDecoration: 'none', color: '' }}>
        OJAS
      </Link>{' '}
      Site.
    </h4>
      <small className="text-light">
        Compress your photograph & signature Fast and Easy.
      </small>

      {showImg && (
        <div className="container mt-4 mx-5">
          <div className="row justify-content-center">
            <div className="col">
              {showImg && (
                <table
                  className="table table-bordered table-dark mx-5"
                  style={{ width: "100%" }}
                >
                  <tbody>
                    <tr>
                      <td className="photograph">
                        {image && (
                          <>
                            <img
                              ref={imageRef}
                              src={image}
                              alt="photograph"
                              className="uploaded-img"
                              height={imgHeight}
                              width={imgWidth}
                            />
                            <button
                              className="btn btn-success"
                              onClick={handleDownloadImage}
                            >
                              Download Photograph
                            </button>
                          </>
                        )}
                      </td>
                      <td className="sign">
                        {sign && (
                          <>
                            <img
                              ref={signRef}
                              src={sign}
                              alt="signature"
                              className="uploaded-sign"
                              height={signHeight}
                              width={signWidth}
                              style={{ filter: "grayscale(100%)" }}
                            />
                            <button
                              className="btn btn-success"
                              onClick={handleDownloadSign}
                            >
                              Download Signature
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-success p-4 text-light instruction">
        <p>
          Welcome to Ojas Image and Signature Resizer – Your Go-To Tool for
          Image and Signature Optimization. Whether you're applying for a job,
          filling out important documents, or simply need to resize and enhance
          your photos and signatures, we've got you covered.
        </p>
      </div>

      <h4 className="text-light mt-2">
      This Image Resizer is Design only For{' '}
      <Link to="https://ojas.gujarat.gov.in/" style={{ textDecoration: 'none', color: '' }}>
        OJAS
      </Link>{' '}
      Site.
    </h4>
      <small className="text-light">
        Compress your photograph & signature Fast and Easy.
      </small>
    </>
  );
}
