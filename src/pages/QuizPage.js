import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import FullScreenWarning from "../components/FullScreenWarning";
import Quiz from "../components/Quiz";
import questionsData from "../data/questions.json";

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [isFullScreen, setIsFullScreen] = useState(
    document.fullscreenElement !== null
  );

  useEffect(() => {
    // Assume questionsData is an array of question objects
    setQuestions(questionsData);

    const handleFullScreenChange = () => {
      setIsFullScreen(document.fullscreenElement !== null);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  const handleEnableFullScreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    }
  };

  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      {isFullScreen ? (
        <Quiz questions={questions} />
      ) : (
        <FullScreenWarning onEnableFullScreen={handleEnableFullScreen} />
      )}
    </Box>
  );
};

export default QuizPage;
