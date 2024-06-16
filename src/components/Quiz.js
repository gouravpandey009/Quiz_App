import React, { useEffect, useState, useRef } from "react";
import { Container, Box, Paper, Button, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Question from "./Question";
import {
  saveQuizState,
  loadQuizState,
  saveStartTime,
  loadStartTime,
  clearQuizState,
} from "../utils/localStorageUtils";

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600000); 
  const timerRef = useRef(null);

  useEffect(() => {
    const savedState = loadQuizState();
    const startTime = loadStartTime();

    if (savedState) {
      setCurrentQuestion(savedState.currentQuestion);
      setAnswers(savedState.answers);

      if (startTime) {
        const elapsedTime = Date.now() - parseInt(startTime, 10);
        setTimeLeft(Math.max(600000 - elapsedTime, 0));
      }
    }

    if (!startTime) {
      saveStartTime(Date.now().toString());
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timerRef.current);
          handleQuizSubmit();
        }
        return prevTime - 1000;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    saveQuizState({ currentQuestion, answers });
  }, [currentQuestion, answers]);

  const handleAnswerSelect = (index, answer) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [index]: answer }));
  };

  const handleQuizSubmit = () => {
    setIsSubmitted(true);
    clearQuizState();
    clearInterval(timerRef.current);
    
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  if (!questions || questions.length === 0) {
    return (
      <Container maxWidth="md" sx={{ padding: 4 }}>
        <Typography variant="h4" align="center">
          No Questions Available
        </Typography>
      </Container>
    );
  }

  const progress = ((600000 - timeLeft) / 600000) * 100; // Calculate progress percentage

  return (
    <Container maxWidth="md" sx={{ padding: 4, position: "relative" }}>
      {/* Timer Display */}
      <Box
        sx={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "auto",
          minWidth: "120px",
          padding: "10px",
          backgroundColor: "red",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            height: "15px",
            width: "100%",
            backgroundColor: "#3f51b5",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
            transformOrigin: "left",
            transform: `scaleX(${progress / 100})`,
            transition: "transform 1s linear",
          }}
        />
        <Typography
          sx={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "#fff",
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            width: "100%", // Ensures the text is centered within the container
          }}
        >
          {formatTime(timeLeft)}
        </Typography>
      </Box>

      {/* Question Box */}
      <Paper
        elevation={5}
        sx={{
          padding: 4,
          backgroundColor: "#f5f5f5",
          borderRadius: 5,
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
          mb: 3,
          minHeight: "60vh",
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/purty-wood.png')"
        }}
      >
        {isSubmitted ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "80vh",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
              padding: "30px",
              textAlign: "center",
            }}
          >
            <Box sx={{ mb: 4 }}>
              <CheckCircleOutlineIcon
                sx={{ fontSize: "5rem", color: "#4caf50" }}
              />
            </Box>
            <Typography variant="h4" mb={2} sx={{ color: "#333" }}>
              Quiz Submitted Successfully!
            </Typography>
            <Typography variant="body1" sx={{ color: "#555", lineHeight: 1.6 }}>
              Congratulations! You've completed the quiz. Thank you for your
              participation.
            </Typography>
          </Box>
        ) : (
          <Question
            question={questions[currentQuestion]}
            index={currentQuestion}
            selectedAnswer={answers[currentQuestion]}
            onSelectAnswer={handleAnswerSelect}
            questions={questions}
          />
        )}
      </Paper>

      {/* Navigation Buttons */}
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setCurrentQuestion(currentQuestion - 1)}
          disabled={currentQuestion === 0 || isSubmitted}
          sx={{
            padding: "10px 20px",
            fontSize: "1rem",
            borderRadius: 2,
            backgroundColor: "green",
            "&:hover": {
              backgroundColor: "green",
            },
          }}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            if (currentQuestion === questions.length - 1) {
              handleQuizSubmit();
            } else {
              setCurrentQuestion(currentQuestion + 1);
            }
          }}
          disabled={isSubmitted}
          sx={{
            padding: "10px 20px",
            fontSize: "1rem",
            borderRadius: 2,
            backgroundColor: "green",
            "&:hover": {
              backgroundColor: "green",
            },
          }}
        >
          {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
        </Button>
      </Box>
    </Container>
  );
};

export default Quiz;
