import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import DisplayImage from "./pages/home/DisplayImage";


function App() {
  return (
   <Router>
    <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/displayimage" element={<DisplayImage/>} />
    </Routes>
   </Router>
  );
}

export default App;