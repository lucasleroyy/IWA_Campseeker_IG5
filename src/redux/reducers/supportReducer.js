import { createReducer } from "@reduxjs/toolkit";
import { fetchOpenQuestions, answerQuestion, deleteQuestion } from "../actions/supportActions";

const initialState = {
  openQuestions: [], // Liste des questions ouvertes
  loading: false,    // État de chargement
  error: null,       // Erreur potentielle
};

const supportReducer = createReducer(initialState, (builder) => {
  builder
    // Pendant le chargement
    .addCase(fetchOpenQuestions.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    // Succès de la récupération
    .addCase(fetchOpenQuestions.fulfilled, (state, action) => {
      state.loading = false;
      state.openQuestions = action.payload; // Met à jour les questions ouvertes
    })
    // Échec de la récupération
    .addCase(fetchOpenQuestions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // Enregistre l'erreur
    })

    .addCase(answerQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(answerQuestion.fulfilled, (state, action) => {
        state.loading = false;
  
        // Met à jour la question dans la liste
        const updatedQuestion = action.payload;
        const index = state.openQuestions.findIndex(
          (question) => question.questionId === updatedQuestion.questionId
        );
        if (index !== -1) {
          state.openQuestions[index] = updatedQuestion; // Remplace la question par la version mise à jour
        }
      })
      .addCase(answerQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

          // Delete a question
    .addCase(deleteQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.loading = false;
        const deletedQuestionId = action.payload;
        state.openQuestions = state.openQuestions.filter(
          (question) => question.questionId !== deletedQuestionId
        );
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
});

export default supportReducer;
