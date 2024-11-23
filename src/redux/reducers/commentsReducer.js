import { createSlice } from "@reduxjs/toolkit";
import { fetchCommentsByLocationId } from "../actions/commentsActions";

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
      });
  },  
});

export default commentsSlice.reducer;
