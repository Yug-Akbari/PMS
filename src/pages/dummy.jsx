// import * as React from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import { Button } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import TextField from "@mui/material/TextField";
// import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
// import { useState } from "react";
// import Navbar from "../Navbar";
// import {
//   firebaseGetDocs,
//   firebaseSetDoc,
//   firebaseGetSelectedDocs,
// } from "../../firebase/utils";
// import { useSelector } from "react-redux";
// import userSelector from "../../redux/selectors/user";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { validateFields } from "../../utils/helper";

// const columns = [
//   { field: "id", headerName: "ID", headerClassName: "custom-header" },
//   { field: "title", headerName: "Title", headerClassName: "custom-header" },
//   { field: "type", headerName: "Type", headerClassName: "custom-header" },
//   {
//     field: "description",
//     headerName: "description",
//     width: 130,
//     headerClassName: "custom-header",
//   },
// ];

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 4,
//   borderRadius: "10px",
// };

// const Expense = () => {
//   const { currentUser } = useSelector(userSelector);
//   const [open, setOpen] = React.useState(false);
//   const [selectedValue, setSelectedValue] = useState([]);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const requiredFields = ["date", "title", "amount", "type", "description"];
//   const [expense, setExpense] = useState([]);
//   const [expenseData, setExpenseData] = useState({
//     date: new Date(),
//     title: "",
//     amount: "",
//     type: "",
//   });
//   const [selectedOptionDescription, setSelectedOptionDescription] =
//     useState("");
//   const [selectedOptionId, setSelectedOptionId] = useState("");

//   const handleChange = (e) => {
//     setExpenseData({
//       ...expenseData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Find the selected option and set its description
//   const addData = () => {
//     const selectedOptionData = selectedValue.find(
//       (item) => item.title === expenseData.type
//     );
//     setSelectedOptionDescription(
//       selectedOptionData ? selectedOptionData.description : ""
//     );
//     setSelectedOptionId(selectedOptionData ? selectedOptionData.id : "");
//     console.log(selectedOptionData);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateFields(expenseData, requiredFields)) {
//       handleClose();
//       console.log("coming here");
//       try {
//         const expenseDocs = await firebaseSetDoc("expense", {
//           ...expenseData,
//           uid: currentUser?.uid,
//           categoryId: selectedOptionId,
//           description: selectedOptionDescription,
//         });
//         console.log(
//           "🚀 ~ file: Expense.js:67 ~ handleSubmit ~ expenseDocs:",
//           expenseDocs
//         );
//       } catch (err) {
//         console.log("🚀 ~ file: Expense.js:68 ~ handleSubmit ~ err:", err);
//       }
//       setExpenseData({});
//     }
//   };

//   const getCategory = async (id, value) => {
//     const categoryData = await firebaseGetSelectedDocs("category", id, value);
//     setSelectedValue(categoryData);
//     console.log(
//       "🚀 ~ file: Category.js:76 ~ getCategory ~ categoryData:akshay",
//       categoryData
//     );
//   };

//   const getExpense = async (id) => {
//     const expenseData = await firebaseGetDocs("expense", id);
//     setExpense(expenseData || []);
//     // console.log("🚀 ~ file: Expense.js:76 ~ getExpense ~ expenseData:akshay", expenseData)
//   };
//   console.log(selectedValue);
//   console.log(expenseData?.type);

//   React.useEffect(() => {
//     if (currentUser && currentUser.uid) {
//       getExpense(currentUser.uid);
//       getCategory(currentUser.uid, "expense");
//       addData();
//     }
//   }, [currentUser, open, expenseData?.type]);
//   return (
//     <>
//       <Navbar />
//       <div style={{ paddingRight: "30px" }}>
//         <div>
//           <div
//             className=""
//             style={{
//               paddingTop: "50px",
//               display: "flex",
//               flexDirection: "row-reverse",
//               paddingRight: "30px",
//             }}
//           >
//             <Button
//               variant="contained"
//               disableElevation
//               onClick={handleOpen}
//               style={{ backgroundColor: "#f50041" }}
//             >
//               {" "}
//               <AddIcon /> &nbsp;&nbsp;ADD
//             </Button>
//           </div>
//         </div>
//         <div style={{ padding: "30px 30px" }}>
//           <DataGrid
//             rows={expense}
//             columns={columns}
//             initialState={{
//               pagination: {
//                 paginationModel: { page: 0, pageSize: 5 },
//               },
//             }}
//             pageSizeOptions={[5, 10]}
//           />
//         </div>
//       </div>
//       -
//       <div>
//         <Modal
//           open={open}
//           onClose={handleClose}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box sx={style}>
//             <Typography
//               id="modal-modal-title"
//               variant="h6"
//               component="h2"
//               style={{ textAlign: "center" }}
//             >
//               ADD Expense
//             </Typography>
//             <Box
//               component="form"
//               noValidate
//               onClose={handleClose}
//               onSubmit={handleSubmit}
//               id="modal-modal-description"
//               sx={{ mt: 2 }}
//             >
//               <Typography id="modal-modal-description" sx={{ mt: 5 }}>
//                 <LocalizationProvider
//                   id="date"
//                   name="date"
//                   value={expenseData?.date}
//                   onChange={handleChange}
//                   dateAdapter={AdapterDayjs}
//                 >
//                   <DatePicker sx={{ minWidth: 400 }} />
//                 </LocalizationProvider>
//                 <TextField
//                   margin="normal"
//                   required
//                   fullWidth
//                   id="title"
//                   label="Title"
//                   value={expenseData?.title}
//                   onChange={handleChange}
//                   name="title"
//                   autoComplete="email"
//                   autoFocus
//                 />
//                 <TextField
//                   margin="normal"
//                   required
//                   fullWidth
//                   id="amount"
//                   value={expenseData?.amount}
//                   onChange={handleChange}
//                   label="amount"
//                   name="amount"
//                   autoFocus
//                 />
//                 <div style={{ marginTop: "10px" }}>
//                   <FormControl sx={{ minWidth: 400 }}>
//                     <InputLabel id="demo-simple-select-label">
//                       Select
//                     </InputLabel>
//                     <Select
//                       labelId="demo-simple-select-label"
//                       id="type"
//                       name="type"
//                       value={expenseData?.type}
//                       onChange={handleChange}
//                     >
//                       {selectedValue?.map((item) => (
//                         <MenuItem
//                           key={item.id}
//                           value={item?.title}
//                           sx={{
//                             display: "block !important",
//                             padding: "16px !important",
//                             textTransform: "capitalize",
//                           }}
//                         >
//                           {item?.title}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 </div>
//                 <div style={{ paddingTop: "20px" }}>
//                   <TextField
//                     id="description"
//                     name="description"
//                     label="Discription"
//                     multiline
//                     fullWidth
//                     rows={4}
//                     value={selectedOptionDescription}
//                   />
//                 </div>
//                 <div
//                   className=""
//                   style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     padding: "30px",
//                   }}
//                 >
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     style={{ backgroundColor: "#f50041" }}
//                   >
//                     Submit
//                   </Button>
//                 </div>
//               </Typography>
//             </Box>
//           </Box>
//         </Modal>
//       </div>
//       <style>
//         {`
//         .custom-header {
//         color:black;
//         font-weight: bold;
//         font-Size:20px;
//         }
//     `}
//       </style>
//     </>
//   );
// };

// export default Expense;