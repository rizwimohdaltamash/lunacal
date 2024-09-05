import React, { useState, useEffect, useRef } from "react";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";
// import "../../css/style.css";
import { storage } from "../../firebase/Firebase"; // Adjust your import path
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid"; // For generating unique image names

const HomePage = () => {
  const [selectedSection, setSelectedSection] = useState("About Me");
  const [images, setImages] = useState([]);

  const scrollRef = useRef(null);

  // Fetch images from Firebase Storage
  useEffect(() => {
    const fetchImages = async () => {
      const listRef = ref(storage, "gallery/"); // Assume 'gallery/' is the folder
      const res = await listAll(listRef);
      const urls = await Promise.all(
        res.items.map((item) => getDownloadURL(item))
      );
      setImages(urls);
    };
    fetchImages();
  }, []);

  // Handle image upload
  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `gallery/${uuidv4()}_${file.name}`); // Store with a unique name
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Optional: You can track the progress here
      },
      (error) => {
        console.error("Upload error: ", error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setImages((prev) => [...prev, downloadURL]); // Add the new image to the list
      }
    );
  };

  const scrollGallery = (direction) => {
    const scrollAmount = 300; // Amount to scroll on each click
    if (scrollRef.current) {
      const newPosition =
        direction === "left"
          ? scrollRef.current.scrollLeft - scrollAmount
          : scrollRef.current.scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
    }
  };

  // Default number of characters for text
  const aboutMeText =
    "I am Mohd. Altamash Rizwi, currently in my third year of B.Tech at the Indian Institute of Information Technology, Ranchi. My journey in technology has been marked by a robust engagement with both front-end and back-end web development. Over the years, I have honed my skills in frontend and implementing user-friendly interfaces, as well as developing robust server-side applications. My projects have included everything from crafting responsive frontends to optimizing database performances, which has given me a well-rounded understanding of the full web development lifecycle.";

  const experiencesText =
    "I completed a 2-month internship at DJ Interactive Technology, where I gained valuable experience in web development, focusing on both front-end and back-end aspects. During this time, I worked on various projects that involved live client based projects, designing user-friendly interfaces, implementing interactive features, and developing server-side logic. This role helped me enhance my technical skills and provided me with a solid understanding of creating effective and efficient web applications.Over the years, I have honed my skills in frontend and implementing user-friendly interfaces, as well as developing robust server-side applications.";

  const recommendedText =
    "During my 2-month internship at DJ Interactive Technology, I demonstrated a strong aptitude for both front-end and back-end web development. My work involved designing intuitive user interfaces and developing efficient server-side solutions, which contributed significantly to our project outcomes. I consistently showed enthusiasm, a keen problem-solving ability, and a collaborative spirit. I am confident that these qualities, combined with my technical skills, make me a valuable asset to any team.";

  // Function to get the correct text based on selected section
  const getDisplayedText = () => {
    switch (selectedSection) {
      case "About Me":
        return aboutMeText;
      case "Experiences":
        return experiencesText;
      case "Recommended":
        return recommendedText;
      default:
        return aboutMeText;
    }
  };

  return (
    <div className="h-screen flex flex-row w-full">
         <div className="lg:w-1/2 bg-gray-800"></div>





         <div className=" w-full lg:w-1/2 bg-gray-800">
         
         
         <div className=" h-[47%] lg:h-[45%] bg-gray-600 m-5 rounded-2xl flex flex-col items-center">

          <div className="h-[20%] w-full md:w-[95%] lg:w-[90%] mt-4 bg-gray-900 flex flex-row justify-evenly items-center rounded-[400px] md:rounded-[400px] lg:rounded-[400px]">
            <button className={`px-2 md:px-16 lg:px-[62px] py-2 md:py-5 lg:py-3 rounded-3xl text-white ${
                  selectedSection === "About Me" ? "bg-gray-800" : ""
                }`} onClick={() => setSelectedSection("About Me")} >About Me</button>

            <button className={`px-2 md:px-16 lg:px-[62px] py-2 md:py-5 lg:py-3 rounded-3xl text-white ${
                  selectedSection === "Experiences" ? "bg-gray-800" : ""
                }`} onClick={() => setSelectedSection("Experiences")}>Experiences</button>

            <button className={`px-2 md:px-16 lg:px-[62px] py-2 md:py-5 lg:py-3 rounded-3xl text-white ${
                  selectedSection === "Recommended" ? "bg-gray-800" : ""
                }`} onClick={() => setSelectedSection("Recommended")}>Recommended</button>
          </div>

          <div className="h-[80%] w-full lg:w-[90%] bg-gray-600" >
          <div className="h-full w-full overflow-y-auto">
                <p className="text-white  p-3">{getDisplayedText()}</p>
              </div>
          </div>

         </div>


             {/* div 2 */}
         <div className="h-[45%] bg-gray-600 m-5 rounded-2xl">

         <div className="h-[20%] flex flex-row ">
            {/* Gallery */}
            <div className="w-[25%] lg:w-1/3 text-white flex justify-start mt-4 ml-2 md:ml-10 lg:ml-10">
              <button className="bg-black px-6 rounded-xl text-xs md:text-lg lg:text-lg">Gallery</button>
            </div>
            
             {/* Left Right */}
            <div className=" w-[75%] lg:w-2/3  flex justify-end mt-4">
            <label className="bg-gray-800 rounded-full text-white px-3 py-2 md:px-4 lg:px-6 md:py-3 lg:py-2 cursor-pointer flex items-center shadow-[0px_4px_10px_rgba(255,255,255,0.5)] hover:bg-gray-900 transition duration-200 ease-in-out">
                    
                    <p className="text-xs md:text-lg lg:text-lg" >+ADD IMAGE</p>
                    <input
                      type="file"
                      onChange={handleAddImage}
                      style={{ display: "none" }}
                    />
                  </label>

          <div className="flex flex-row justify-center items-center w-1/2 gap-x-4 cursor-pointer">
                  <FaCircleArrowLeft
                    size={40}
                    className="rounded-full shadow-[0px_4px_10px_rgba(255,255,255,0.5)]"
                    onClick={() => scrollGallery("left")}
                  />
                  <FaCircleArrowRight
                    size={40}
                    className="rounded-full shadow-[0px_4px_10px_rgba(255,255,255,0.5)]"
                    onClick={() => scrollGallery("right")}
                  />
                </div>
            </div>


        </div>


        <div className="h-[80%] w-full flex flex-row justify-center">

        <div
            ref={scrollRef}
            className="flex overflow-x-auto w-[100%] mt-14 gap-x-4 scrollbar-custom" // Enable horizontal scrolling
          >
            <div className="flex flex-row gap-x-4 ml-2 md:ml-8 lg:ml-10">
              {images.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt="Uploaded"
                  className="w-[200px] h-[150px] object-cover rounded-lg"
                />
              ))}
            </div>
          </div>

        </div>
         </div>

       

         </div>
    </div>
  
  );
};

export default HomePage;


