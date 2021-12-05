import React, { useEffect } from 'react'
import Auth from '../../components/Auth'
import changePassword from "../../assets/images/changePassword.svg"
import CustomButton from "../../components/CustomButton"
import CustomPasswordField from '../../components/CustomPasswordField'
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from "../../axios";
import { useHistory } from 'react-router';
import "../Login/style.scss"

const ChangePassword = () => {
    useEffect(() => {
        document.title = "Change Password"
    }, [])
    return (
        <div>
            <Auth
                showOAuth={false}
                image={changePassword}
                label="Change Password"
                formComponent={<ChangePasswordForm />}
            />
        </div>
    )
}

const ChangePasswordForm = () => {
    const history = useHistory();
    const initialValues = {
        password: '',
        confirmPassword: ''
    }
    const onSubmit = (values) => {
        const config = {
            headers: {
                "x-auth-token": localStorage.getItem("authToken")
            }
        }
        const data = {
            password: values.password
        }
        axios.post("/users/change-password", data, config).then((response) => {
            if (response.data.status === "success") {
                history.push("/home")
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    const validationSchema = Yup.object({
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
        <div style={{ marginTop: "50px" }}>
            <div className="loginForm">
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
                    label="Change Password"
                    onPress={formik.handleSubmit}
                />
            </div>
        </div>
    )
}

export default ChangePassword
