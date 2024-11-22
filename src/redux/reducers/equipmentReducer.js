import { createSlice } from '@reduxjs/toolkit';
import { fetchEquipments, addEquipment, removeEquipment } from '../actions/equipmentActions';

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
      })
      .addCase(addEquipment.fulfilled, (state, action) => {
        state.equipments.push(action.payload);  // Add the new equipment to the state
      })
      .addCase(removeEquipment.fulfilled, (state, action) => {
        state.equipments = state.equipments.filter(
          (equipment) => equipment.equipmentId !== action.payload
        );
      });
  }
});

export default equipmentSlice.reducer;
