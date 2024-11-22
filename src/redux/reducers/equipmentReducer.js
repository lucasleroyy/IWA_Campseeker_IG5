import { createSlice } from '@reduxjs/toolkit';
import { fetchEquipments } from '../actions/equipmentActions';

const equipmentSlice = createSlice({
  name: 'equipments',
  initialState: {
    equipments: [],
    loading: false,
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEquipments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEquipments.fulfilled, (state, action) => {
        state.loading = false;
        state.equipments = action.payload;
      })
      .addCase(fetchEquipments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default equipmentSlice.reducer;
