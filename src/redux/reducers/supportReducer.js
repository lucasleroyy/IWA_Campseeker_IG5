// src/redux/reducers/supportReducer.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchOpenQuestions, answerQuestion, deleteQuestion, fetchAnsweredQuestions, createQuestion } from "../actions/supportActions";

const initialState = {
  openQuestions: [],
  answeredQuestions: [], // Ajout des questions répondues
  loading: false,
  error: null,
};

const supportSlice = createSlice({
  name: "support",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Récupérer les questions ouvertes
    builder
      .addCase(fetchOpenQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOpenQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.openQuestions = action.payload;
      })
      .addCase(fetchOpenQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Répondre à une question
    builder
      .addCase(answerQuestion.fulfilled, (state, action) => {
        state.openQuestions = state.openQuestions.filter(
          (question) => question.questionId !== action.payload.questionId
        );
        state.answeredQuestions.push(action.payload); // Ajouter la question répondue à la liste
      });

    // Supprimer une question
    builder
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.openQuestions = state.openQuestions.filter(
          (question) => question.questionId !== action.payload
        );
      });

    // Récupérer les questions répondues
    builder
      .addCase(fetchAnsweredQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnsweredQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.answeredQuestions = action.payload; // Stocker les questions répondues
      })
      .addCase(fetchAnsweredQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Question
    builder
    .addCase(createQuestion.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createQuestion.fulfilled, (state, action) => {
      state.loading = false;
      state.openQuestions.push(action.payload); // Ajoute la nouvelle question aux questions ouvertes
    })
    .addCase(createQuestion.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default supportSlice.reducer;
