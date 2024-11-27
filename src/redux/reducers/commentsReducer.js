import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCommentsByLocationId,
  deleteComment,
  createComment,
  fetchCommentById,
} from "../actions/commentsActions";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [], // Liste des commentaires pour le code existant
    commentsById: {}, // Stockage optimisé par ID
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Récupération des commentaires par lieu
      .addCase(fetchCommentsByLocationId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentsByLocationId.fulfilled, (state, action) => {
        state.loading = false;
        action.payload.forEach((comment) => {
          state.commentsById[comment.commentId] = comment;
        });
        state.comments = Object.values(state.commentsById);
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
        const comment = action.payload;
        state.commentsById[comment.commentId] = comment;
        if (!state.comments.some((c) => c.commentId === comment.commentId)) {
          state.comments.push(comment);
        }
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Suppression d'un commentaire
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        const commentId = action.payload;
        delete state.commentsById[commentId];
        state.comments = state.comments.filter(
          (comment) => comment.commentId !== commentId
        );
      })
      .addCase(deleteComment.rejected, (state, action) => {
        console.error("Error deleting comment:", action.payload);
        state.loading = false;
        state.error = action.payload;
      })

      // Récupération d'un commentaire par ID
      .addCase(fetchCommentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentById.fulfilled, (state, action) => {
        state.loading = false;
        const comment = action.payload;
        state.commentsById[comment.commentId] = comment;
        if (!state.comments.some((c) => c.commentId === comment.commentId)) {
          state.comments.push(comment);
        }
      })
      .addCase(fetchCommentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default commentsSlice.reducer;
