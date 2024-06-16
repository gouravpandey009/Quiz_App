export const saveQuizState = (state) => {
  localStorage.setItem("quizState", JSON.stringify(state));
};

export const loadQuizState = () => {
  const state = localStorage.getItem("quizState");
  return state ? JSON.parse(state) : null;
};

export const saveStartTime = (time) => {
  localStorage.setItem("startTime", time);
};

export const loadStartTime = () => {
  return localStorage.getItem("startTime");
};

export const clearQuizState = () => {
  localStorage.removeItem("quizState");
  localStorage.removeItem("startTime");
};
