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
import { toastConfig, validateFields } from '../../utils/helper';
import { firebaseLogin } from '../../firebase/utils';
import { errorMessage } from '../../utils/error-message';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const theme = createTheme();
export default function Login() {
    const navigate = useNavigate();

    const [loginData, setLoginData] = React.useState({
        email: "",
        password: "",
        rememberMe: true
    })
    console.log("🚀 ~ file: Login.js:24 ~ Login ~ loginData:", loginData)
    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        })
    }
    const requiredFields = ['email', 'password']
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateFields(loginData, requiredFields)) {
            try {
                const loginUser = await firebaseLogin(loginData)
                if (loginUser) {
                    toast.success("user logged in successfully", toastConfig)
                    navigate("/expense")
                }

            } catch (err) {
                let msg = errorMessage[err.code] || err?.message
                console.log("🚀 ~ file: Register.js:77 ~ Submit ~ msg:", msg)
                toast.error(msg, toastConfig)
            }
        }
    };
    const Submit = () => {
        window.location = '/expense'
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
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                onChange={handleChange}
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                onChange={handleChange}
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={(e) => {
                                            setLoginData(
                                                {
                                                    ...loginData,
                                                    [e.target.name]: e.target.value === 'on' ? true : false
                                                }
                                            )
                                        }}
                                        defaultChecked={loginData.rememberMe}
                                        color="primary"
                                    />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            // onClick={Submit}
                            >

                                Sign In


                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    {/* <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link> */}
                                </Grid>
                                <Grid item>
                                    <Link href="/" variant="body2">
                                        {"Don't have an account? Sign Up"}
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