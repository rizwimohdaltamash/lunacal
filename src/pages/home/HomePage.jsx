// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";
// import { fireDB, storage } from "../../firebase/Firebase"; // Adjust your import path
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { collection, addDoc } from "firebase/firestore";

// const HomePage = () => {
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   // Function to generate a random 6-character alphanumeric code
//   const generateRandomCode = () => {
//     return Math.random().toString(36).substring(2, 8);
//   };

//   // Handle file selection
//   const handleFileChange = (e) => {
//     if (e.target.files[0]) {
//       setFile(e.target.files[0]);
//     }
//   };

//   // Upload photo to Firebase Storage and save info to Firestore
//   const handleUpload = async () => {
//     if (!file) {
//       setMessage("Please select a file first.");
//       return;
//     }
//     setUploading(true);
//     const randomCode = generateRandomCode();
//     const fileName = `${uuidv4()}_${file.name}`;

//     try {
//       const storageRef = ref(storage, `photos/${fileName}`);
//       await uploadBytes(storageRef, file);
//       const downloadURL = await getDownloadURL(storageRef);

//       // Save to Firestore with the random code
//       await addDoc(collection(fireDB, "photos"), {
//         photoURL: downloadURL,
//         code: randomCode,
//         timestamp: new Date(),
//       });

//       // Update the message to include the code
     
//       setMessage(`${randomCode}`)

//     } catch (error) {
//       console.error("Error uploading photo: ", error);
//       setMessage("Failed to upload photo.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">Upload Your Photo</h1>
//       <div className="bg-white p-6 rounded-lg shadow-md w-96">
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//           className="mb-4 w-full p-2 border border-gray-300 rounded"
//         />
//         <button
//           onClick={handleUpload}
//           disabled={uploading}
//           className={`w-full p-2 rounded text-white ${
//             uploading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
//           }`}
//         >
//           {uploading ? "Uploading..." : "Upload Photo"}
//         </button>
//         {message && (
           
//           <p className="mt-4 text-center text-sm text-gray-700">Image Uploaded Succesfully ! <br/> Your code is : <span className="text-green-600 font-bold">{message}</span> </p>
//         )}
//       </div>
//       <button
//         onClick={() => navigate("/displayimage")}
//         className="mt-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
//       >
//         Next Page
//       </button>
//     </div>
//   );
// };

// export default HomePage;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { fireDB, storage } from "../../firebase/Firebase"; // Adjust your import path
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { QRCodeCanvas } from "qrcode.react"; // Import QRCodeCanvas

const HomePage = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [photoURL, setPhotoURL] = useState(""); // Store the uploaded photo URL
  const navigate = useNavigate();

  // Function to generate a random 6-character alphanumeric code
  const generateRandomCode = () => {
    return Math.random().toString(36).substring(2, 8);
  };

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Upload photo to Firebase Storage and save info to Firestore
  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }
    setUploading(true);
    const randomCode = generateRandomCode();
    const fileName = `${uuidv4()}_${file.name}`;

    try {
      const storageRef = ref(storage, `photos/${fileName}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      // Save to Firestore with the random code
      await addDoc(collection(fireDB, "photos"), {
        photoURL: downloadURL,
        code: randomCode,
        timestamp: new Date(),
      });

      // Update the state with the download URL
      setPhotoURL(downloadURL);
      setMessage(`${randomCode}`);

    } catch (error) {
      console.error("Error uploading photo: ", error);
      setMessage("Failed to upload photo.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Upload Your Photo</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4 w-full p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleUpload}
          disabled={uploading}
          className={`w-full p-2 rounded text-white ${
            uploading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {uploading ? "Uploading..." : "Upload Photo"}
        </button>
        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">
            Image Uploaded Successfully! <br /> Your code is:{" "}
            <span className="text-green-600 font-bold">{message}</span>
          </p>
        )}

        {/* Render the QR Code if the photo URL is available */}
        {photoURL && (
          <div className="mt-4 ">
            {/* <h2 className="text-lg font-bold text-gray-800 ml-0">QR Code:</h2> */}
            <div className="ml-14">
                <QRCodeCanvas
              value={photoURL}
              size={200}
              bgColor={"#ffffff"}
              fgColor={"#000000"}
              level={"L"}
              includeMargin={false}
            />
            </div>
            
            <p className="text-center text-sm text-gray-600 mt-2">
              Scan to view the uploaded photo
            </p>
          </div>
        )}
      </div>

      <button
        onClick={() => navigate("/displayimage")}
        className="mt-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
      >
        Next Page
      </button>
    </div>
  );
};

export default HomePage;
