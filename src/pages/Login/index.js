import React, { useEffect, useState } from 'react'
import Auth from '../../components/Auth'
import loginSvg from "../../assets/images/login.svg"
import CustomButton from "../../components/CustomButton"
import { Link } from 'react-router-dom'
import CustomTextField from '../../components/CustomTextField'
import "./style.scss"
import CustomPasswordField from '../../components/CustomPasswordField'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { useDispatch } from 'react-redux'
import { login } from "../../redux/actions/Auth";
import axios from "../../axios"
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Login = () => {
    useEffect(() => {
        document.title = "Login"
    }, [])
    return (
        <div>
            <Auth
                showOAuth={true}
                image={loginSvg}
                label="Login"
                formComponent={<LoginForm />}
            />
        </div>
    )
}

const LoginForm = () => {
    const dispatch = useDispatch();
    const initialValues = {
        email: '',
        password: ''
    }
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const handleSnackbarOpen = () => {
        setSnackbarOpen(true);
    };
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
        setSnackbarMessage("");
    };
    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleSnackbarClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    const onSubmit = (values) => {
        axios.post("/auth/login", values).then((response) => {
            if (response.data.status === "success") {
                dispatch(login(response.data.result.token, response.data.result.user))
            }
            else {
                setSnackbarMessage(response.data.errors[0].msg)
                handleSnackbarOpen()
            }
        }).catch((error) => console.log(error.message))
    }
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid Email').required('Required'),
        password: Yup.string().required('Required').min(8, "Min Length 8").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Must Contain One Uppercase, One Lowercase, One Number and one special case Character")
    })
    const formik = useFormik({ initialValues, onSubmit, validationSchema });
    return (
        <div className="loginForm">
            <div className="loginFields">
                <div className="loginField">
                    <CustomTextField
                        label="Email"
                        name="email"
                        value={formik.values.email}
                        type="email"
                        handleChange={formik.handleChange}
                        error={Boolean(formik.touched.email && formik.errors.email)}
                        helperText={formik.errors.email}
                    />
                </div>
                <div className="loginField">
                    <CustomPasswordField
                        label="Password"
                        name="password"
                        value={formik.values.password}
                        handleChange={formik.handleChange}
                        error={Boolean(formik.touched.password && formik.errors.password)}
                        helperText={formik.errors.password}
                    />
                </div>
            </div>
            <CustomButton
                label="Let's Catch up!"
                onPress={formik.handleSubmit}
            />
            <div className="loginForm__labels">
                <Link to="/forgot-password"><span>Forgot Password ?</span></Link>
                <p>Don’t have an account? <Link to="/signup"><span>Sign up</span></Link></p>
            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
                action={action}
            />
        </div>
    )
}

export default Login
