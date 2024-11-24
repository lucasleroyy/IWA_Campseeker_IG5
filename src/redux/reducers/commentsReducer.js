import { createSlice } from "@reduxjs/toolkit";
import { fetchCommentsByLocationId, deleteComment, fetchCommentById } from "../actions/commentsActions";

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
      .addCase(fetchCommentsByLocationId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentsByLocationId.fulfilled, (state, action) => {
        console.log("Comments received:", action.payload); // Debug
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchCommentsByLocationId.rejected, (state, action) => {
        console.error("Error fetching comments:", action.payload); // Debug
        state.loading = false;
        state.error = action.payload;
      })


      // Gestion de la suppression d'un commentaire
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = state.comments.filter(
          (comment) => comment.commentId !== action.payload
        ); // Supprime le commentaire localement
      })
      .addCase(deleteComment.rejected, (state, action) => {
        console.error("Error deleting comment:", action.payload); // Debug
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchCommentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentComment = action.payload; // Stocke le commentaire actuel
      })
      .addCase(fetchCommentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },  
});

export default commentsSlice.reducer;
