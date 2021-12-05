import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import "./style.scss"
import CustomButton from "../../components/CustomButton"
import CustomTextField from '../../components/CustomTextField'
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from "../../axios"
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { setProject } from "../../redux/actions/Project"

const ProjectSettings = () => {
    const dispatch = useDispatch();
    const { id } = useParams()
    const projectDetails = useSelector(state => state.project)
    const initialValues = {
        name: projectDetails?.project?.name ? projectDetails?.project?.name : "",
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
        const config = {
            headers: {
                "x-auth-token": localStorage.getItem("authToken")
            }
        }
        const data = {
            projectName: values.name,
            projectId: id
        }
        axios.post("/project/update", data, config).then((response) => {
            if (response.data.status === "success") {
                dispatch(setProject(response.data.project))
                window.location.reload()
            }
            else {
                setSnackbarMessage(response.data.errors[0].msg)
                handleSnackbarOpen()
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
    })
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });
    return (
        <div className="projectSettings">
            <div className="loginForm">
                <div className="loginFields">
                    <div className="loginField">
                        <CustomTextField
                            label="Project Name"
                            name="name"
                            value={formik.values.name}
                            handleChange={formik.handleChange}
                            error={Boolean(formik.touched.name && formik.errors.name)}
                            helperText={formik.errors.name}
                        />
                    </div>
                </div>
                <CustomButton
                    label="Update"
                    onPress={formik.handleSubmit}
                />
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

export default ProjectSettings
