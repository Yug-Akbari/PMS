import { createDraftSafeSelector } from '@reduxjs/toolkit'

const selectCategory = (state) => state.category

const categorySelector = createDraftSafeSelector(selectCategory, (category) => category)

export default categorySelector
