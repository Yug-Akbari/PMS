import { createDraftSafeSelector } from '@reduxjs/toolkit'

const selectIncome = (state) => state.income

const incomeSelector = createDraftSafeSelector(selectIncome, (income) => income)

export default incomeSelector
