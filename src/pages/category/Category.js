import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
// import { firebaseGetAuthorizedUser } from '../../firebase/utils'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useState } from 'react';
import Navbar from '../Navbar';
import { categoryTypes, validateFields } from '../../utils/helper';
import { firebaseGetDocs, firebaseSetDoc } from '../../firebase/utils';
import { firebaseAuth } from '../../firebase/init';
import { useDispatch, useSelector } from 'react-redux';
import userSelector from '../../redux/selectors/user';

const columns = [
    { field: 'id', headerName: 'ID', headerClassName: 'custom-header' },
    { field: 'title', headerName: 'Title', headerClassName: 'custom-header' },
    { field: 'type', headerName: 'Type', headerClassName: 'custom-header' },
    { field: 'description', headerName: 'description', width: 130, headerClassName: 'custom-header' },
];

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
};




const Category = () => {
    const { currentUser } = useSelector(userSelector)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const requiredFields = ['title', 'type', 'description']
    const [category, setCategory] = useState([])
    const [categoryData, setCategoryData] = useState({
        title: "",
        type: "",
        description: ""
    })
    const handleChange = (e) => {
        setCategoryData(
            {
                ...categoryData,
                [e.target.name]: e.target.value
            }
        )
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (validateFields(categoryData, requiredFields)) {
            handleClose()
            console.log("coming here")
            try {
                const categoryDocs = await firebaseSetDoc("category", { ...categoryData, uid: firebaseAuth.currentUser.uid })
                console.log("🚀 ~ file: Category.js:67 ~ handleSubmit ~ categoryDocs:", categoryDocs)
            } catch (err) {
                console.log("🚀 ~ file: Category.js:68 ~ handleSubmit ~ err:", err)

            }
        }
    }

    const getCategory = async () => {
        const categoryData = await firebaseGetDocs("category", currentUser.uid)
        setCategory(categoryData)
        console.log("🚀 ~ file: Category.js:76 ~ getCategory ~ categoryData:akshay", categoryData)
    }


    React.useEffect(() => {
        if (currentUser?.uid) {
            getCategory()
        }
    }, [currentUser, open])
    return (
        <>
            <Navbar />
            <div style={{ paddingRight: "30px" }}>
                <div>
                    <div className='' style={{ paddingTop: "50px", display: "flex", flexDirection: "row-reverse", paddingRight: "30px" }}>
                        <Button variant="contained" disableElevation onClick={handleOpen} style={{ backgroundColor: "#f50041" }}> <AddIcon /> &nbsp;&nbsp;ADD</Button>
                    </div>
                </div>
                <div style={{ padding: "30px 30px" }}>
                    <DataGrid
                        rows={category}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                    />
                </div>
            </div>
            -<div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: "center" }}>
                            ADD Category
                        </Typography>
                        <Box component="form" noValidate onClose={handleClose} onSubmit={handleSubmit} id="modal-modal-description" sx={{ mt: 2 }}>

                            <TextField
                                onChange={handleChange}
                                value={categoryData?.title}
                                margin="normal"
                                required
                                fullWidth
                                id="title"
                                label="Title"
                                name="title"
                                autoComplete="title"
                                autoFocus
                            />
                            <FormControl sx={{ minWidth: 400 }} >
                                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                <Select
                                    name="type"
                                    value={categoryData?.category}
                                    onChange={handleChange}
                                >
                                    {categoryTypes?.map(type => (
                                        <MenuItem
                                            sx={{
                                                display: "block !important",
                                                padding: "16px !important",
                                                textTransform: "capitalize"
                                            }}
                                            value={type}
                                        >
                                            {type}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TextField
                                value={categoryData.description}
                                onChange={handleChange}
                                name={'description'}
                                sx={{ mt: 2 }}
                                id="outlined-multiline-static"
                                label="description"
                                multiline
                                fullWidth
                                rows={4}
                            />
                            <div className='' style={{ display: "flex", justifyContent: "center", padding: "30px" }}>
                                <Button type="submit" variant="contained" style={{ backgroundColor: "#f50041" }}>Submit</Button>
                            </div>

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
    )
}

export default Category
