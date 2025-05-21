import { createSlice } from '@reduxjs/toolkit';

const classNameSlice = createSlice({
  name: 'isVisible',
  initialState: { value: false },
  reducers: {
    setIsModalVisible: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setIsModalVisible } = classNameSlice.actions;
export default classNameSlice.reducer;