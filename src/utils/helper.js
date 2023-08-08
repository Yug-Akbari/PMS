import { toast } from 'react-toastify';

export const validateFields = (data, requiredFields) => {
  console.log("🚀 ~ file: helper.js:4 ~ validateFields ~ data:", data)
  let isValid = true
  const dataKeys = Object.keys(data)
  for (let i = 0; i < dataKeys.length; i++) {
    if (requiredFields.includes(dataKeys[i])) {
      if (data[dataKeys[i]] === "") {
        isValid = false
        console.log("coming")
        toast.error(`${dataKeys[i]} is required`, toastConfig)
        break;
      }
    }
  }
  return isValid
}

export const toastConfig = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
}
export const categoryTypes = ["income", 'expense']

export const incomeCategory=[]
export const expenseCategory=[]