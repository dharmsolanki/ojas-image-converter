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

  const handleImageChange = async (event) => {
    if (event.target && event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      // Function to resize and compress the selected image
      resizeAndCompressImage(file)
        .then((compressedImage) => {
          setImage(compressedImage);
        })
        .catch((error) => {
          console.error("Error compressing image:", error);
        });
    }
  };

  const handleSignChange = async (event) => {
    if (event.target && event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      // Function to resize and compress the selected signature
      resizeAndCompressImage(file)
        .then((compressedSignature) => {
          setSign(compressedSignature);
        })
        .catch((error) => {
          console.error("Error compressing signature:", error);
        });
    }
  };

  // Function to resize and compress an image
  const resizeAndCompressImage = async (file) => {
    return new Promise((resolve, reject) => {
      const maxWidthOrHeight = 300; // Adjust as needed
      const maxSizeKB = 15; // Maximum size in KB

      const image = new Image();
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      image.onload = () => {
        let width = image.width;
        let height = image.height;

        // Resize the image while maintaining the aspect ratio
        if (width > height) {
          if (width > maxWidthOrHeight) {
            height *= maxWidthOrHeight / width;
            width = maxWidthOrHeight;
          }
        } else {
          if (height > maxWidthOrHeight) {
            width *= maxWidthOrHeight / height;
            height = maxWidthOrHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Draw the resized image on the canvas
        ctx.drawImage(image, 0, 0, width, height);

        // Convert the canvas to a Blob with specified image format and quality
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Error converting canvas to Blob"));
              return;
            }

            if (blob.size / 1024 > maxSizeKB) {
              reject(new Error("Image size exceeds 15KB"));
              return;
            }

            // Create a data URL for the compressed image
            const reader = new FileReader();
            reader.onload = () => {
              resolve(reader.result);
            };
            reader.readAsDataURL(blob);
          },
          "image/jpeg", // Adjust the format if needed
          0.9 // Adjust the quality (0-1)
        );
      };

      image.onerror = () => {
        reject(new Error("Error loading image"));
      };

      // Load the selected image
      image.src = URL.createObjectURL(file);
    });
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
        <div className="border border-info border-2 p-4 mb-4">
          <div className="row mt-4">
            <div className="col">
              <div className="form-group">
                <label htmlFor="exampleInputImage">Upload Photograph</label>
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

          <div className="row mt-4">
            <div className="col">
              <div className="form-group">
                <label htmlFor="exampleInputSign">Upload Signature</label>
                <input
                  type="file"
                  className="form-control mt-2"
                  id="exampleInputSign"
                  accept="image/*" // Specify that only image files are allowed
                  onChange={handleSignChange}
                />
              </div>
            </div>
          </div>

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
    </>
  );
}
