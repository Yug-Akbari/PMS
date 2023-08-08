import { createDraftSafeSelector } from '@reduxjs/toolkit'

const selectExpense = (state) => state.expense

const expenseSelector = createDraftSafeSelector(selectExpense, (expense) => expense)

export default expenseSelector
