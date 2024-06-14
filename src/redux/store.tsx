import {configureStore} from '@reduxjs/toolkit';
import signup from './features/auth';
import modalAuth from './features/modalAuth';

export const store = configureStore({
  reducer: {signup, modalAuth},
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
