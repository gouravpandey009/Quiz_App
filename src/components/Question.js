import React from "react";
import {
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Container,
  Paper,
} from "@mui/material";

const Question = ({ question, index, selectedAnswer, onSelectAnswer }) => {
  if (!question) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  const isAnswerCorrect = (answerIndex) =>
    question.choices[answerIndex] === question.correctAnswer;

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        padding: 2,
        position: "relative",
        
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 700,
          padding: 3,
          boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
          borderRadius: 4,
          backgroundImage: `url('https://www.transparenttextures.com/patterns/sakura.png')`, // Adding the same texture background for consistency
          backgroundBlendMode: "overlay",
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
          },
          marginTop: 4,
          paddingBottom: 4,
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#333",
              marginBottom: 3,
              textAlign: "center",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
              textTransform: "uppercase",
            }}
          >
            {`Q${index + 1}: ${question.question}`}
          </Typography>
          <RadioGroup
            value={selectedAnswer || ""}
            onChange={(e) => onSelectAnswer(index, e.target.value)}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            {question.choices.map((choice, idx) => (
              <FormControlLabel
                key={idx}
                value={choice}
                control={
                  <Radio
                    sx={{
                      color: isAnswerCorrect(idx) ? "#4caf50" : "#00796b",
                      "&.Mui-checked": {
                        color: isAnswerCorrect(idx) ? "#4caf50" : "#004d40",
                      },
                    }}
                  />
                }
                label={choice}
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "1.1rem",
                    color: "#555",
                    transition: "color 0.3s, font-size 0.3s",
                    "&:hover": {
                      color: "#00796b",
                      fontSize: "1.2rem",
                    },
                    ...(isAnswerCorrect(idx)
                      ? {
                          fontWeight: "bold",
                          backgroundColor: "#e8f5e9",
                          padding: "8px",
                          borderRadius: "4px",
                        }
                      : {}),
                  },
                }}
              />
            ))}
          </RadioGroup>
        </CardContent>
      </Paper>
    </Container>
  );
};

export default Question;
