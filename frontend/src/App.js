import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GuestList from "./pages/GuestList"; 

// Import video and image from assets
import video from "../src/asset/video.mp4";  
import Back from "../src/asset/Back1.jpg";  

const App = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [guest, setGuest] = useState({
    name: "",
    phone: "",
    email: "",
    foodPreference: "",
  });

  const eventDate = new Date("2025-05-03T18:30:00");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = eventDate - now;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleYesClick = () => {
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/guest", guest);
      toast.success("Completed details!");
      setShowForm(false);
      setGuest({ name: "", phone: "", email: "", foodPreference: "" }); // Reset form
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <Router>
      <div style={mainContainerStyle}>
        <div style={blurredBackgroundStyle}></div>
        <div style={contentStyle}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <video
                    autoPlay
                    controls
                    style={videoStyle}
                    playsInline
                    disablePictureInPicture
                  >
                    <source src={video} type="video/mp4" />
                  </video>

                  <h1 style={{ fontSize: "2rem", color: "#8C0000", textAlign: "center", fontWeight: "bold" }}>
                    Days until our special day
                  </h1>
                  <p style={{ textAlign: "center", color: "white", fontSize: "1.125rem" }}>
                    <span style={{ fontSize: "1.85rem", color: "#FF204E", fontWeight: "bold", marginRight: "0.5rem" }}>
                      {timeLeft.days} Days
                    </span>
                    <span style={{ fontSize: "1.85rem", color: "#F94C10", fontWeight: "bold", marginRight: "0.5rem" }}>
                      {timeLeft.hours} Hours
                    </span>
                    <span style={{ fontSize: "1.85rem", color: "#006769", fontWeight: "bold" }}>
                      {timeLeft.minutes} Minutes
                    </span>
                  </p>

                  <h2 style={{ fontSize: "2rem", color: "#FF6500", textAlign: "center", fontWeight: "bold" }}>
                    Our story isn’t complete without you! Will you be joining us?
                    <br />RSVP by April 5, 2025.
                  </h2>

                  <div>
                    <button onClick={handleYesClick} style={buttonStyle}>
                      Yes
                    </button>
                    <button style={buttonStyle}>No</button>
                  </div>

                  {showForm && (
                    <form onSubmit={handleSubmit} style={formStyle}>
                      <input
                        type="text"
                        placeholder="Name"
                        required
                        value={guest.name}
                        onChange={(e) => setGuest({ ...guest, name: e.target.value })}
                        style={inputStyle}
                      />
                      <input
                        type="tel"
                        placeholder="Phone"
                        required
                        value={guest.phone}
                        onChange={(e) => setGuest({ ...guest, phone: e.target.value })}
                        style={inputStyle}
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        required
                        value={guest.email}
                        onChange={(e) => setGuest({ ...guest, email: e.target.value })}
                        style={inputStyle}
                      />
                      <select
                        value={guest.foodPreference}
                        onChange={(e) => setGuest({ ...guest, foodPreference: e.target.value })}
                        required
                        style={inputStyle}
                      >
                        <option value="" disabled>Select Food Preference</option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Vegan">Vegan</option>
                        <option value="Halal">Halal</option>
                        <option value="Gluten-Free">Gluten-Free</option>
                        <option value="Nut-Free">Nut-Free</option>
                      </select>
                      <button type="submit" style={buttonStyle}>
                        Submit
                      </button>
                    </form>
                  )}

                  <br />
                  <Link to="/guests">
                    <button style={buttonStyle}>View Guests</button>
                  </Link>
                  <ToastContainer />
                </>
              }
            />
            <Route path="/guests" element={<GuestList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

// Style for the main container
const mainContainerStyle = {
  position: "relative",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  color: "#fff",
};

// Style for the blurred background
const blurredBackgroundStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: `url(${Back})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  filter: "blur(8px)",
  zIndex: "-1",
};

// Style for the content container
const contentStyle = {
  position: "relative",
  zIndex: "1",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "20px",
};

// Style for the video
const videoStyle = {
  width: "80%",
  maxWidth: "800px",
  borderRadius: "8px",
  marginBottom: "20px",
};

// Style for the buttons
const buttonStyle = {
  padding: "10px 20px",
  margin: "10px",
  backgroundColor: "#0B2F9F",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

// Style for the form inputs
const inputStyle = {
  padding: "10px",
  margin: "5px",
  width: "250px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

// Style for the form container
const formStyle = {
  marginTop: "20px",
  textAlign: "center",
};

export default App;
