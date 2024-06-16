import React, { useEffect, useState } from "react";
import { Typography, Button, Box } from "@mui/material";

const FullScreenWarning = ({ onEnableFullScreen }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundImage:
          "url('https://www.transparenttextures.com/patterns/45-degree-fabric-light.png'), url('https://source.unsplash.com/1600x900/?nature,water')",
        backgroundSize: "cover, cover",
        backgroundPosition: "center, center",
        backgroundBlendMode: "overlay",
        color: "#ffffff", // Light text color for contrast
        textAlign: "center",
        overflow: "hidden",
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark overlay for text readability
        padding: 4,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "24px",
          padding: 6,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          maxWidth: "90%",
          width: "600px", // Increased width for better readability
          textAlign: "center",
          backdropFilter: "blur(10px)",
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          position: "relative",
          zIndex: 1,
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 15px 40px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#00796b",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            transition: "color 0.3s ease",
            "&:hover": {
              color: "#004d40",
            },
          }}
        >
          Please Enable Full Screen
        </Typography>
        <Typography
          variant="body1"
          align="center"
          paragraph
          sx={{
            color: "#616161",
            fontSize: "1.2rem",
            lineHeight: "1.8",
            maxWidth: "500px",
            margin: "0 auto 20px auto",
            transition: "color 0.3s ease",
            "&:hover": {
              color: "#00796b",
            },
          }}
        >
          For the best experience, please enable full screen mode. Click the
          button below to enter full screen.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={onEnableFullScreen}
          sx={{
            marginTop: 3,
            padding: "14px 28px",
            fontSize: "1.1rem",
            borderRadius: "12px",
            backgroundColor: "#00796b",
            boxShadow: "0 6px 18px rgba(0, 0, 0, 0.2)",
            transition:
              "background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: "#004d40",
              transform: "scale(1.05)",
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.4)",
            },
          }}
        >
          Enable Full Screen
        </Button>
      </Box>
    </Box>
  );
};

const App = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(document.fullscreenElement != null);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  const enableFullScreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
        );
      });
    } else if (document.documentElement.mozRequestFullScreen) {
      /* Firefox */
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      /* IE/Edge */
      document.documentElement.msRequestFullscreen();
    }
  };

  return (
    <div>
      {!isFullScreen && (
        <FullScreenWarning onEnableFullScreen={enableFullScreen} />
      )}
      {isFullScreen && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Typography variant="h2" gutterBottom>
            Welcome to the Full Screen App
          </Typography>
          <Typography variant="body1">
            You are now in full screen mode.
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default App;
