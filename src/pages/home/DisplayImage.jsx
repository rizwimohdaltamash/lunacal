import React, { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { fireDB } from "../../firebase/Firebase"; // Adjust your import path

const DisplayImage = () => {
  const [codeInput, setCodeInput] = useState("");
  const [imageURL, setImageURL] = useState(null);
  const [error, setError] = useState("");

  // Handle code input change
  const handleCodeInputChange = (e) => {
    setCodeInput(e.target.value);
  };

  // Handle code submission
  const handleCodeSubmit = async () => {
    if (codeInput.trim() === "") {
      setError("Please enter a valid code.");
      setImageURL(null);
      return;
    }

    try {
      // Query Firestore for the document with the matching code
      const q = query(collection(fireDB, "photos"), where("code", "==", codeInput));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // If a match is found, get the image URL
        querySnapshot.forEach((doc) => {
          setImageURL(doc.data().photoURL);
        });
        setError("");
      } else {
        setError("Invalid code. Please try again.");
        setImageURL(null);
      }
    } catch (err) {
      console.error("Error fetching image:", err);
      setError("Something went wrong. Please try again later.");
      setImageURL(null);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Find Your Image</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <input
          type="text"
          value={codeInput}
          onChange={handleCodeInputChange}
          placeholder="Enter 6-character code"
          className="mb-4 w-full p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleCodeSubmit}
          className="w-full p-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          OK
        </button>

        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        
        {imageURL && (
          <div className="mt-6">
            <img
              src={imageURL}
              alt="Uploaded"
              className="w-full h-auto object-contain rounded-lg shadow-md"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayImage;
