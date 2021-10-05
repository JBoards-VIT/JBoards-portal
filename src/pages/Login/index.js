import React, { useEffect } from 'react'
import Auth from '../../components/Auth'
import login from "../../assets/images/login.svg"
import CustomButton from "../../components/CustomButton"
import { Link } from 'react-router-dom'
import CustomTextField from '../../components/CustomTextField'
import "./style.scss"
import CustomPasswordField from '../../components/CustomPasswordField'
import { useFormik } from 'formik'
import * as Yup from "yup"
const Login = () => {
    useEffect(() => {
        document.title = "Login"
    }, [])
    return (
        <div>
            <Auth
                showOAuth={true}
                image={login}
                label="Login"
                formComponent={<LoginForm />}
            />
        </div>
    )
}

const LoginForm = () => {
    const initialValues = {
        email: '',
        password: ''
    }
    const onSubmit = (values) => {
        console.log(values)
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
        </div>
    )
}

export default Login
