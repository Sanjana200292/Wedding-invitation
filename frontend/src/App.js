import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GuestList from "./pages/GuestList"; 

// Import video from assets
import video from "../src/asset/video.mp4";  

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

  const handleViewGuests = (navigate) => {
    const password = prompt("Enter the admin password:");
    if (password === "my wedding") {
      navigate("/guests");
    } else {
      alert("Incorrect password! Access denied.");
    }
  };

  return (
    <Router>
      <div style={mainContainerStyle}>
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

                  <h1 style={{ fontSize: "2rem", color: "#000000", textAlign: "center", fontWeight: "bold" }}>
                    Days until our special day
                  </h1>
                  <p style={{ textAlign: "center", color: "black", fontSize: "1.125rem" }}>
                    <span style={{ fontSize: "1.85rem", color: "#000000", fontWeight: "bold", marginRight: "0.5rem" }}>
                      {timeLeft.days} Days
                    </span>
                    <span style={{ fontSize: "1.85rem", color: "#000000", fontWeight: "bold", marginRight: "0.5rem" }}>
                      {timeLeft.hours} Hours
                    </span>
                    <span style={{ fontSize: "1.85rem", color: "#000000", fontWeight: "bold" }}>
                      {timeLeft.minutes} Minutes
                    </span>
                  </p>

                  <h2 style={{ fontSize: "2rem", color: "#000000", textAlign: "center", fontWeight: "bold" }}>
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
                        <option value="Vegan">Non-Vegetarian</option>
                      </select>
                      <button type="submit" style={buttonStyle}>
                        Submit
                      </button>
                    </form>
                  )}

                  <br />
                  <NavigateWithPassword handleViewGuests={handleViewGuests} />
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

const NavigateWithPassword = ({ handleViewGuests }) => {
  const navigate = useNavigate();
  return (
    <button onClick={() => handleViewGuests(navigate)} style={buttonStyle}>
      View Guests
    </button>
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
  backgroundColor: "white",
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
  backgroundColor: "#FE4F2D",
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
