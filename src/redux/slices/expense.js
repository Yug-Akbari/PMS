import {createSlice } from '@reduxjs/toolkit'

const initialState = {
  expense: {},
  open: false,
  errorMessage: null,
  isPending: false,
  isSuccess: false,
}

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload
    },
    addExpense: (state, action) => {
      state.expense = { ...state.expense, ...action.payload }
    },
    removeExpense: (state, action) => {
      state.expense = { ...action.payload }
    },
    clearExpense: (state) => {
      state.expense = null
    },
  },
})

export default expenseSlice
export const {
  setDetailsValues,
  setOpen,
  addExpense,
  removeExpense,
  clearExpense,
} = expenseSlice.actions
