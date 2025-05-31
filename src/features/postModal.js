import { createSlice } from '@reduxjs/toolkit';

const postModalClass = createSlice({
  name: 'isVisible',
  initialState: { value: false },
  reducers: {
    setIsPostModalVisible: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setIsPostModalVisible } = postModalClass.actions;
export default postModalClass.reducer;