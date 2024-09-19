import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type modalAuthTypes = {
  title: string;
  description: string;
  active: boolean;
  action: () => void;
};

const initialState = {
  title: '',
  description: '',
  active: false,
  action: () => null,
} as modalAuthTypes;

export const modalAuth = createSlice({
  name: 'modalAuth',
  initialState,
  reducers: {
    reset: () => initialState,
    setValue: (
      state,
      action: PayloadAction<Record<string, string | number | boolean>>
    ) => {
      const keys = Object.keys(action.payload);
      keys.forEach(function (key: string) {
        state[key] = action.payload[key];
      });
    },
  },
});

export const {setValue, reset} = modalAuth.actions;
export default modalAuth.reducer;
