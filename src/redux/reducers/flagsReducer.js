import { createReducer } from '@reduxjs/toolkit';
import { reportFlag, fetchFlaggedLocations, fetchFlaggedComments, updateFlag } from '../actions/flagsActions';

const initialState = {
  flags: [],
  flaggedLocations: [],
  commentFlags: [],
  loading: false,
  error: null,
};

const flagsReducer = createReducer(initialState, (builder) => {
  builder
    // Signalement de lieu
    .addCase(reportFlag.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(reportFlag.fulfilled, (state, action) => {
      state.loading = false;
      state.flags.push(action.payload); // Ajoute le nouveau flag à la liste
    })
    .addCase(reportFlag.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // Récupération des lieux signalés
    .addCase(fetchFlaggedLocations.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchFlaggedLocations.fulfilled, (state, action) => {
      state.loading = false;
      state.flaggedLocations = action.payload; // Stocke les lieux signalés
    })
    .addCase(fetchFlaggedLocations.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Récupération des commentaires signalés
    .addCase(fetchFlaggedComments.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchFlaggedComments.fulfilled, (state, action) => {
      state.loading = false;
      state.commentFlags = action.payload; // Stocke les flags de commentaires
    })
    .addCase(fetchFlaggedComments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(updateFlag.fulfilled, (state, action) => {
      const updatedFlag = action.payload;
    
      // Vérifiez si c'est un flag pour un lieu (location)
      if (updatedFlag.locationId) {
        const locationIndex = state.flaggedLocations.findIndex(
          (location) => location.flagId === updatedFlag.flagId
        );
        if (locationIndex !== -1) {
          state.flaggedLocations[locationIndex] = {
            ...state.flaggedLocations[locationIndex],
            status: updatedFlag.status,
            reviewedBy: updatedFlag.reviewedBy,
          };
        }
      }
    
      // Vérifiez si c'est un flag pour un commentaire (comment)
      if (updatedFlag.commentId) {
        const commentIndex = state.commentFlags.findIndex(
          (comment) => comment.flagId === updatedFlag.flagId
        );
        if (commentIndex !== -1) {
          state.commentFlags[commentIndex] = {
            ...state.commentFlags[commentIndex],
            status: updatedFlag.status,
            reviewedBy: updatedFlag.reviewedBy,
          };
        }
      }
    });
    
});

export default flagsReducer;
