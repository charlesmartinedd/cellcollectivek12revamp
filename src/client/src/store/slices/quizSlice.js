import { createSlice } from '@reduxjs/toolkit'

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    currentQuiz: null,
    currentQuestionIndex: 0,
    answers: {},
    score: null,
    feedback: [],
    isComplete: false,
  },
  reducers: {
    loadQuiz: (state, action) => {
      state.currentQuiz = action.payload
      state.currentQuestionIndex = 0
      state.answers = {}
      state.score = null
      state.feedback = []
      state.isComplete = false
    },
    answerQuestion: (state, action) => {
      const { questionId, answer } = action.payload
      state.answers[questionId] = answer
    },
    nextQuestion: (state) => {
      if (state.currentQuiz && state.currentQuestionIndex < state.currentQuiz.questions.length - 1) {
        state.currentQuestionIndex += 1
      }
    },
    previousQuestion: (state) => {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1
      }
    },
    submitQuiz: (state, action) => {
      state.score = action.payload.score
      state.feedback = action.payload.feedback
      state.isComplete = true
    },
    resetQuiz: (state) => {
      state.currentQuestionIndex = 0
      state.answers = {}
      state.score = null
      state.feedback = []
      state.isComplete = false
    },
  },
})

export const {
  loadQuiz,
  answerQuestion,
  nextQuestion,
  previousQuestion,
  submitQuiz,
  resetQuiz,
} = quizSlice.actions

export default quizSlice.reducer
