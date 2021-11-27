import React, { useEffect } from 'react'
import Auth from '../../components/Auth'
import signup from "../../assets/images/signup.svg"
import CustomButton from "../../components/CustomButton"
import { Link } from 'react-router-dom'
import CustomTextField from '../../components/CustomTextField'
import "../Login/style.scss"
import CustomPasswordField from '../../components/CustomPasswordField'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { useDispatch } from 'react-redux'
import { login } from "../../redux/actions/Auth";

const Signup = () => {
    useEffect(() => {
        document.title = "Sign Up"
    }, [])
    return (
        <>
            <Auth
                showOAuth={true}
                image={signup}
                label="Sign Up"
                formComponent={<SignupForm />}
            />
        </>
    )
}

const SignupForm = () => {
    const dispatch = useDispatch();
    const initialValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
    const onSubmit = (values) => {
        console.log(values)
        dispatch(login())
    }
    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid Email').required('Required'),
        password: Yup.string().required('Required').min(8, "Min Length 8").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Must Contain One Uppercase, One Lowercase, One Number and one special case Character"),
        confirmPassword: Yup.string().required('Required').min(8, "Min Length 8").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Must Contain One Uppercase, One Lowercase, One Number and one special case Character").when("password", {
            is: val => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
                [Yup.ref("password")],
                "Both password need to be the same"
            )
        })
    })
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });
    return (
        <div className="loginForm">
            <div className="loginFields">
                <div className="loginField">
                    <CustomTextField
                        label="Name"
                        name="name"
                        value={formik.values.name}
                        handleChange={formik.handleChange}
                        error={Boolean(formik.touched.name && formik.errors.name)}
                        helperText={formik.errors.name}
                    />
                </div>
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
            </div>
            <div className="loginFields">
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
                <div className="loginField">
                    <CustomPasswordField
                        label="Confirm Password"
                        name="confirmPassword"
                        value={formik.values.confirmPassword}
                        handleChange={formik.handleChange}
                        error={Boolean(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                        helperText={formik.errors.confirmPassword}
                    />
                </div>
            </div>
            <CustomButton
                label="Sign me up !"
                onPress={formik.handleSubmit}
            />
            <div className="loginForm__labels">
                <p>Already have an account ? <Link to="/login"><span>Sign In</span></Link></p>
            </div>
        </div>
    )
}

export default Signup
