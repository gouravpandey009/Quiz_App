import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    setIsQuizStarted(true);
    navigate("/quiz");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden", // Ensure no scrollbars appear
        backgroundImage: isQuizStarted
          ? "linear-gradient(135deg, #ff6b6b, #ff3d3d)"
          : "linear-gradient(135deg, #ffd3b6, #ffafbd), url('https://source.unsplash.com/1600x900/?nature,landscape'), url('https://www.transparenttextures.com/patterns/45-degree-fabric-light.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
        color: "#212121",
        textAlign: "center",
        padding: 4,
        backgroundAttachment: "fixed",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "24px",
          padding: 6,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          maxWidth: "90%", // Increased width for better readability
          width: "600px", // Fixed width for the box
          textAlign: "center",
          backdropFilter: "blur(10px)",
          transition:
            "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, background-color 0.3s ease",
          position: "relative",
          zIndex: 1,
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 15px 40px rgba(0, 0, 0, 0.3)",
            backgroundColor: "rgba(255, 255, 255, 1)", // Change background on hover
          },
        }}
      >
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#ff6b6b",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            transition: "color 0.3s ease",
            "&:hover": {
              color: "#ff3d3d",
            },
          }}
        >
          {isQuizStarted ? "Get Ready!" : "Welcome to the Quiz"}
        </Typography>
        <Typography
          variant="body1"
          align="center"
          paragraph
          sx={{
            color: "#555555",
            fontSize: "1.2rem",
            lineHeight: "1.8",
            maxWidth: "500px",
            margin: "0 auto 20px auto",
            transition: "color 0.3s ease",
            "&:hover": {
              color: "#ff6b6b",
            },
          }}
        >
          {isQuizStarted
            ? "Brace yourself for some challenging questions!"
            : "Test your knowledge and challenge yourself with our engaging quiz. Click the button below to start!"}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleStartQuiz}
          sx={{
            padding: "14px 28px",
            fontSize: "1.1rem",
            borderRadius: "12px",
            backgroundColor: "#ff6b6b",
            boxShadow: "0 6px 18px rgba(0, 0, 0, 0.2)",
            transition:
              "background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: "#ff3d3d",
              transform: "scale(1.05)",
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.4)",
            },
          }}
        >
          {isQuizStarted ? "Start Quiz" : "Begin Quiz"}
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
