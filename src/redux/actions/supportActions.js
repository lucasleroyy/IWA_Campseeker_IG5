import { createAsyncThunk } from "@reduxjs/toolkit";

// Action pour récupérer les questions avec le statut "open"
export const fetchOpenQuestions = createAsyncThunk(
  "support/fetchOpenQuestions",
  async (_, thunkAPI) => {
    const apiUrl = thunkAPI.getState().config.apiUrl; // Récupérer l'URL de l'API depuis le state
    try {
      const response = await fetch(`${apiUrl}/support/open`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des questions ouvertes.");
      }

      const data = await response.json(); // Parse la réponse en JSON
      return data; // Retourne la liste des questions
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


// Action pour répondre à une question
export const answerQuestion = createAsyncThunk(
  "support/answerQuestion",
  async ({ questionId, reponse }, thunkAPI) => {
    const apiUrl = thunkAPI.getState().config.apiUrl; // URL de base de l'API
    try {
      const response = await fetch(`${apiUrl}/support/${questionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reponse }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi de la réponse.");
      }

      return await response.json(); // Retourne la question mise à jour
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Action to delete a question
export const deleteQuestion = createAsyncThunk(
    'support/deleteQuestion',
    async (questionId, thunkAPI) => {
      const apiUrl = thunkAPI.getState().config.apiUrl; // Fetch the API URL from state
      try {
        const response = await fetch(`${apiUrl}/support/${questionId}`, {
          method: 'DELETE',
        });
  
        if (!response.ok) {
          throw new Error('Failed to delete the question.');
        }
  
        return questionId; // Return the ID of the deleted question
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );


export const fetchAnsweredQuestions = createAsyncThunk(
  "support/fetchAnsweredQuestions",
  async (_, thunkAPI) => {
    const apiUrl = thunkAPI.getState().config.apiUrl; // URL de l'API
    try {
      const response = await fetch(`${apiUrl}/support/answered`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des questions répondues.");
      }

      const data = await response.json();
      return data; // Retourne les questions répondues
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Action pour créer une nouvelle question
export const createQuestion = createAsyncThunk(
    "support/createQuestion",
    async ({ userId, question }, thunkAPI) => {
      const apiUrl = thunkAPI.getState().config.apiUrl; // Récupération de l'URL de l'API
      try {
        const response = await fetch(`${apiUrl}/support`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, question }),
        });
  
        if (!response.ok) {
          throw new Error("Erreur lors de la création de la question.");
        }
  
        const data = await response.json();
        return data; // Retourne la question créée
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
