// store.js
import { configureStore } from '@reduxjs/toolkit';
import classNameReducer from './features/openRegisterModal';
import postModalClass from './features/postModal'

export default configureStore({
  reducer: {
    isVisible: classNameReducer,
    postModal: postModalClass
  },
});