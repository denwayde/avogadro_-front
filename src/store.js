// store.js
import { configureStore } from '@reduxjs/toolkit';
import classNameReducer from './features/openRegisterModal';

export default configureStore({
  reducer: {
    isVisible: classNameReducer,
  },
});