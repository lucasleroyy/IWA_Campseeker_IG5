import { createSlice } from "@reduxjs/toolkit";
import { fetchCommentsByLocationId, createComment } from "../actions/commentsActions";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [], // Liste des commentaires
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Récupération des commentaires
      .addCase(fetchCommentsByLocationId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentsByLocationId.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchCommentsByLocationId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Création d'un commentaire
      .addCase(createComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload); // Ajoute le nouveau commentaire
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default commentsSlice.reducer;
