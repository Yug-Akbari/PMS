import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  income: {},
  open: false,
  errorMessage: null,
  isPending: false,
  isSuccess: false,
}

const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload
    },
    addIncome: (state, action) => {
      state.income = { ...state.income, ...action.payload }
    },
    removeIncome: (state, action) => {
      state.income = { ...action.payload }
    },
    clearIncome: (state) => {
      state.income = null
    },
  },
})

export default incomeSlice
export const {
  setDetailsValues,
  setOpen,
  addIncome,
  removeIncome,
  clearIncome,
} = incomeSlice.actions
