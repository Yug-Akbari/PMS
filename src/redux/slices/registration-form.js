import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  detailsValues: {
    name: '',
    email: '',
  },
  passwordValues: {
    password: '',
    confirmPassword: '',
  },
  
  readyToGo: false,
  step: 1,
}

const registrationFormSlice = createSlice({
  name: 'registrationForm',
  initialState,
  reducers: {
    setDetailsValues: (state, action) => {
      state.detailsValues = action.payload
    },
    setPasswordValues: (state, action) => {
      state.passwordValues = action.payload
    },
    setReadyToGo: (state, action) => {
      state.readyToGo = action.payload
    },
    setStep: (state, action) => {
      state.step = action.payload
    },
    clearRegistrationForm: (state) => {
      state.detailsValues.name = ''
      state.detailsValues.email = ''
      state.passwordValues.password = ''
      state.passwordValues.confirmPassword = ''
      state.step = 1
    },
  },
})

export default registrationFormSlice
export const {
  setDetailsValues,
  setPasswordValues,
  setReadyToGo,
  setCurrentStep,
  clearRegistrationForm,
  setStep
} = registrationFormSlice.actions
