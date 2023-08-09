import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState } from "react";
import Navbar from "../Navbar";
import {
    firebaseGetDocs,
    firebaseSetDoc,
    firebaseGetSelectedDocs,
} from "../../firebase/utils";
import { useSelector } from "react-redux";
import userSelector from "../../redux/selectors/user";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { validateFields } from "../../utils/helper";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from "moment";

const columns = [
    { field: "id", headerName: "ID", headerClassName: "custom-header", width: 100, },
    { field: "date", headerName: "Date", headerClassName: "custom-header", width: 150, },
    { field: "title", headerName: "Title", headerClassName: "custom-header", width: 150, },
    { field: "type", headerName: "Type", headerClassName: "custom-header", width: 100, },
    {
        field: "description",
        headerName: "description",
        width: 200,
        headerClassName: "custom-header",
    },
    { field: "amount", headerName: "Amount", headerClassName: "custom-header", width: 100, },
];

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
};

const Income = () => {
    const { currentUser } = useSelector(userSelector);
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const requiredFields = ["date", "title", "amount", "type", "description"];
    const [income, setIncome] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [incomeData, setIncomeData] = useState({
        title: "",
        amount: "",
        type: "",
    });
    const [selectedOptionDescription, setSelectedOptionDescription] =
        useState("");
    const [selectedOptionId, setSelectedOptionId] = useState("");
    const handleChange = (e) => {
        setIncomeData({
            ...incomeData,
            [e.target.name]: e.target.value,
        });
    };
    const handleChange1 = (e) => {
        console.log(moment(e).format("L"), "eeeee")
        setSelectedDate(moment(e).format("L"))
    };

    // Find the selected option and set its description
    const addData = () => {
        const selectedOptionData = selectedValue.find(
            (item) => item.title === incomeData.type
        );
        setSelectedOptionDescription(
            selectedOptionData ? selectedOptionData.description : ""
        );
        setSelectedOptionId(selectedOptionData ? selectedOptionData.id : "");
        console.log(selectedOptionData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateFields(incomeData, requiredFields)) {
            handleClose();
            console.log("coming here");
            try {
                const incomeDocs = await firebaseSetDoc("income", {
                    ...incomeData,
                    uid: currentUser?.uid,
                    categoryId: selectedOptionId,
                    description: selectedOptionDescription,
                    date: selectedDate,
                });
                console.log(
                    "🚀 ~ file: Income.js:67 ~ handleSubmit ~ incomeDocs:",
                    incomeDocs
                );
            } catch (err) {
                console.log("🚀 ~ file: Income.js:68 ~ handleSubmit ~ err:", err);
            }
            setIncomeData({});
        }
    };

    const getCategory = async (id, value) => {
        const categoryData = await firebaseGetSelectedDocs("category", id, value);
        setSelectedValue(categoryData);
        console.log(
            "🚀 ~ file: Category.js:76 ~ getCategory ~ categoryData",
            categoryData
        );
    };

    const getIncome = async (id) => {
        const incomeData = await firebaseGetDocs("income", id);
        setIncome(incomeData || []);
        console.log("🚀 ~ file: Income.js:76 ~ getIncome ~ incomeData", incomeData)
    };
    console.log(selectedValue);
    console.log(incomeData?.type);


    React.useEffect(() => {
        if (currentUser && currentUser.uid) {
            getIncome(currentUser.uid);
            getCategory(currentUser.uid, "income");
            addData();
        }
    }, [currentUser, open, incomeData?.type]);
    return (
        <>
            <Navbar />
            <div style={{ paddingRight: "30px" }}>
                <div>
                    <div
                        style={{
                            paddingTop: "50px",
                            display: "flex",
                            flexDirection: "row-reverse",
                            paddingRight: "30px",
                        }}
                    >
                        <Button
                            variant="contained"
                            disableElevation
                            onClick={handleOpen}
                            style={{ backgroundColor: "#f50041" }}
                        >
                            {" "}
                            <AddIcon /> &nbsp;&nbsp;ADD
                        </Button>
                    </div>
                </div>
                <div style={{ padding: "30px 30px" }}>
                    <DataGrid

                        rows={income}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 20 },
                            },
                        }}
                        pageSizeOptions={[10, 20, 30, 40, 50]}
                    />
                </div>
            </div>
            -
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            style={{ textAlign: "center" }}
                        >
                            ADD Income
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onClose={handleClose}
                            onSubmit={handleSubmit}
                            id="modal-modal-description"
                            sx={{ mt: 2 }}
                        >
                            <Typography id="modal-modal-description" sx={{ mt: 5 }}>
                                <LocalizationProvider id="date"
                                    name="date"
                                    value={incomeData?.date}
                                    dateAdapter={AdapterMoment}
                                >
                                    <DatePicker onChange={handleChange1} sx={{ minWidth: 400 }}
                                    />
                                </LocalizationProvider>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="title"
                                    label="Title"
                                    value={incomeData?.title}
                                    onChange={handleChange}
                                    name="title"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="amount"
                                    value={incomeData?.amount}
                                    onChange={handleChange}
                                    label="amount"
                                    name="amount"
                                    autoFocus
                                />
                                <div style={{ marginTop: "10px" }}>
                                    <FormControl sx={{ minWidth: 400 }}>
                                        <InputLabel id="demo-simple-select-label">
                                            Select
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="type"
                                            name="type"
                                            value={incomeData?.type}
                                            onChange={handleChange}
                                        >
                                            {selectedValue?.map((item) => (
                                                <MenuItem
                                                    key={item.id}
                                                    value={item?.title}
                                                    sx={{
                                                        display: "block !important",
                                                        padding: "16px !important",
                                                        textTransform: "capitalize",
                                                    }}
                                                >
                                                    {item?.title}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div style={{ paddingTop: "20px" }}>
                                    <TextField
                                        id="description"
                                        name="description"
                                        label="Discription"
                                        multiline
                                        fullWidth
                                        rows={4}
                                        value={selectedOptionDescription}
                                    />
                                </div>
                                <div
                                    className=""
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        padding: "30px",
                                    }}
                                >
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        style={{ backgroundColor: "#f50041" }}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </Typography>
                        </Box>
                    </Box>
                </Modal>
            </div>
            <style>
                {`
        .custom-header {
        color:black;
        font-weight: bold;
        font-Size:20px;
        }
    `}
            </style>
        </>
    );
};

export default Income;