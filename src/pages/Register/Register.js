import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { firebaseRegister } from '../../firebase/utils';
import { errorMessage } from '../../utils/error-message';
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';
import { toastConfig, validateFields } from '../../utils/helper';

const theme = createTheme();
export default function Register() {
    const navigate = useNavigate();

    const [registerData, setRegisterData] = React.useState({
        email: "",
        password: "",
        repeat_password: "",
        name: "",
        rememberMe: true
    })

    const requiredFields = ['name', 'email', 'password', 'repeat_password']
    const handleChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    };

    const Submit = async () => {
        const tempData = { ...registerData }
        delete tempData["repeat_password"]
        if (validateFields(registerData, requiredFields)) {
            if (registerData?.password !== registerData?.repeat_password) {
                return toast.error(
                    "password should match",
                    toastConfig
                )
            }
            try {
                const registerUser = await firebaseRegister(tempData)
                if (registerUser) {
                    toast.success("An account has been created successfully.", toastConfig)
                    navigate("/dashboard")
                }

            } catch (err) {
                let msg = errorMessage[err.code] || err?.message
                console.log("🚀 ~ file: Register.js:77 ~ Submit ~ msg:", msg)
                toast.error(msg, toastConfig)
            }
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />

                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square container sx={{ height: '100vh' }} justifyContent="center" alignItems="center">
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                onChange={handleChange}
                                margin="normal"
                                required
                                fullWidth
                                id="Full Name"
                                label="Name"
                                name="name"
                                value={registerData.name}
                                autoFocus
                            />
                            <TextField
                                onChange={handleChange}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                value={registerData.email}
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                onChange={handleChange}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                value={registerData.password}
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <TextField
                                onChange={handleChange}
                                margin="normal"
                                required
                                fullWidth
                                name="repeat_password"
                                value={registerData.repeat_password}
                                label="Repeat password"
                                type="password"
                                id="Repeat password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={(e) => {
                                            setRegisterData(
                                                {
                                                    ...registerData,
                                                    [e.target.name]: e.target.value === 'on' ? true : false
                                                }
                                            )
                                        }}
                                        // value={registerData.rememberMe}
                                        defaultChecked={registerData.rememberMe}
                                        name="rememberMe"
                                        color="primary"
                                    />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={Submit}
                            >
                                Register
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    {/* <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link> */}
                                </Grid>
                                <Grid item>
                                    <Link href="/login" variant="body2">
                                        {"already have an account? Sign in"}
                                    </Link>
                                </Grid>
                            </Grid>

                        </Box>
                    </Box>
                </Grid>

            </Grid>
        </ThemeProvider>
    );
}