import { addPhotoToLocation } from "../actions/photoActions";

const photosReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addPhotoToLocation.pending, (state) => {
      state.loading = true;
    })
    .addCase(addPhotoToLocation.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(addPhotoToLocation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});
