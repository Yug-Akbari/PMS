import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../slices/user'
import registrationFormSlice from '../slices/registration-form'
import categorySlice from '../slices/category'
import incomeSlice from '../slices/income'
import expenseSlice from '../slices/expense'

const reducer = {
  // Add your reducers here
  user: userSlice.reducer,
  registrationForm: registrationFormSlice.reducer,
  category: categorySlice.reducer,
  income: incomeSlice.reducer,
  expense: expenseSlice.reducer,
}

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store
