import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type SignUpState = {
  name: string;
  lastName: string;
  nameCommerce: string;
  typeCommerce: string;
  phone: number | null;
  email: string;
  password: string;
  confirmPassword: string;
  currentStep: number;
};

const initialState = {
  name: '',
  lastName: '',
  nameCommerce: '',
  typeCommerce: '',
  phone: null,
  email: '',
  password: '',
  confirmPassword: '',
  currentStep: 1,
} as SignUpState;

export const signUp = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    reset: () => initialState,
    setValue: (
      state,
      action: PayloadAction<Record<string, string | number>>
    ) => {
      const keys = Object.keys(action.payload);
      keys.forEach(function (key: string) {
        state[key] = action.payload[key];
      });
    },
  },
});

export const {setValue, reset} = signUp.actions;
export default signUp.reducer;
