import React, { useEffect } from 'react'
import Auth from '../../components/Auth'
import settingSvg from "../../assets/images/settings.svg"
import CustomButton from "../../components/CustomButton"
import { Link } from 'react-router-dom'
import CustomTextField from '../../components/CustomTextField'
import "../Login/style.scss"
import { useFormik } from 'formik'
import * as Yup from "yup"

const SettingsPage = () => {
    useEffect(() => {
        document.title = "Settings"
    }, [])
    return (
        <>
            <Auth
                showOAuth={false}
                image={settingSvg}
                label="Settings"
                formComponent={<SettingsForm />}
            />
        </>
    )
}

const SettingsForm = () => {
    const initialValues = {
        name: 'Aryak Roy',
        email: 'aryakroy63@gmail.com',
    }
    const onSubmit = (values) => {
        console.log(values)
    }
    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid Email').required('Required'),
    })
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });
    return (
        <div style={{ marginTop: "50px" }}>
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
                <CustomButton
                    label="Update"
                    onPress={formik.handleSubmit}
                />
                <div className="loginForm__labels">
                    <Link to="/settings/changepassword"><span>Change Password</span></Link>
                </div>
            </div>
        </div>
    )
}

export default SettingsPage
