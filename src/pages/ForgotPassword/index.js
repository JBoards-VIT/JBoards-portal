import React, { useEffect } from 'react'
import Auth from '../../components/Auth'
import forgotPassword from "../../assets/images/forgotPassword.svg"
import CustomButton from "../../components/CustomButton"
import CustomTextField from '../../components/CustomTextField'
import "./style.scss"
import { useFormik } from 'formik'
import * as Yup from "yup"

const ForgotPassword = () => {
    useEffect(() => {
        document.title = "Forgot Password"
    }, [])
    return (
        <div>
            <Auth
                showOAuth={false}
                image={forgotPassword}
                label="Forgot Password"
                formComponent={<ForgotPasswordForm />}
            />
        </div>
    )
}

const ForgotPasswordForm = () => {
    const initialValues = {
        'email': ""
    }
    const onSubmit = (values) => {
        console.log(values);
    }
    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid Email").required("Required")
    })
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })
    return (
        <div className="forgotPassword">
            <p>Don’t worry we got you! Enter your email address and we will send you a mail to reset your password.</p>
            <div className="forgotPassword__field">
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
            <CustomButton
                label="Confirm"
                onPress={formik.handleSubmit}
            />
        </div>
    )
}

export default ForgotPassword
