import {  createSlice } from '@reduxjs/toolkit'

const initialState = {
  category: {},
  open: false,
  errorMessage: null,
  isPending: false,
  isSuccess: false,
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload
    },
    addCategory: (state, action) => {
      state.category = { ...state.category, ...action.payload }
    },
    removeCategory: (state, action) => {
      state.category = { ...action.payload }
    },
    clearCategory: (state) => {
      state.category = null
    },
  },
})

export default categorySlice
export const {
  setDetailsValues,
  setOpen,
  addCategory,
  removeCategory,
  clearCategory,
} = categorySlice.actions
