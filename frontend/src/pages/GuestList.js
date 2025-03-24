import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const GuestList = () => {
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/guests")
      .then((response) => {
        setGuests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching guests:", error);
      });
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <h2 style={{ marginBottom: "10px", fontSize: "28px", color: "#333", fontWeight: "bold" }}>Guest List</h2>

      {/* Display Guest Count */}
      <p style={{ fontSize: "18px", fontWeight: "bold", color: "#690B22", marginBottom: "20px" }}>
        Number of Guests: {guests.length}
      </p>

      <Link to="/">
        <button
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            marginBottom: "20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "background 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Back to Home
        </button>
      </Link>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "90%",
            maxWidth: "800px",
            margin: "auto",
            borderCollapse: "collapse",
            backgroundColor: "#fff",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#007bff", color: "#fff" }}>
              <th style={tableHeaderStyle}>Name</th>
              <th style={tableHeaderStyle}>Phone</th>
              <th style={tableHeaderStyle}>Email</th>
              <th style={tableHeaderStyle}>Food Preference</th>
            </tr>
          </thead>
          <tbody>
            {guests.length > 0 ? (
              guests.map((guest, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#fff" }}>
                  <td style={tableCellStyle}>{guest.name}</td>
                  <td style={tableCellStyle}>{guest.phone}</td>
                  <td style={tableCellStyle}>{guest.email}</td>
                  <td style={tableCellStyle}>{guest.foodPreference}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ ...tableCellStyle, fontWeight: "bold", color: "#555" }}>
                  No guests yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Table header styles
const tableHeaderStyle = {
  padding: "12px",
  textAlign: "center",
  fontSize: "16px",
  fontWeight: "bold",
};

// Table cell styles
const tableCellStyle = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
  textAlign: "center",
  fontSize: "14px",
  color: "#333",
};

export default GuestList;
