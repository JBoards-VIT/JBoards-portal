import React, { useEffect, useState } from 'react'
import Auth from '../../components/Auth'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { ThemeProvider } from '@emotion/react';
import ButtonTheme from '../../themes/ButtonTheme';
import addProject from "../../assets/images/addProject.svg"
import CustomButton from "../../components/CustomButton"
import CustomTextField from '../../components/CustomTextField'
import { useFormik } from 'formik'
import * as Yup from "yup"
import "./style.scss"

const AddProject = () => {
    useEffect(() => {
        document.title = "Add Project"
    }, [])
    return (
        <div>
            <Auth
                showOAuth={false}
                image={addProject}
                label="Add Project"
                formComponent={<AddProjectTabs />}
            />
        </div>
    )
}

const AddProjectTabs = () => {
    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className="add_projects">
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <ThemeProvider theme={ButtonTheme}>
                            <TabList indicatorColor="primary" sx={{
                                "& .MuiTabs-indicator": {
                                    backgroundColor: "primary.main"
                                }
                            }}
                                variant="fullWidth"
                                onChange={handleChange}
                                aria-label="lab API tabs example"
                            >
                                <Tab label="Create Project" value="1" />
                                <Tab label="Join Project" value="2" />
                            </TabList>
                        </ThemeProvider>
                    </Box>
                    <TabPanel value="1">{<CreateProject />}</TabPanel>
                    <TabPanel value="2">{<JoinProject />}</TabPanel>
                </TabContext>
            </Box>
        </div>
    )
}

const CreateProject = () => {
    const initialValues = {
        'name': ""
    }
    const onSubmit = (values) => {
        console.log(values);
    }
    const validationSchema = Yup.object({
        name: Yup.string().required("Required")
    })
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })
    return (
        <div className="forgotPassword">
            <p>Let's start with a name for your Project.</p>
            <div className="forgotPassword__field">
                <CustomTextField
                    label="Project Name"
                    name="name"
                    value={formik.values.name}
                    handleChange={formik.handleChange}
                    error={Boolean(formik.touched.name && formik.errors.name)}
                    helperText={formik.errors.name}
                />
            </div>
            <CustomButton
                label="Create Project"
                onPress={formik.handleSubmit}
            />
        </div>
    )
}

const JoinProject = () => {
    const initialValues = {
        'code': ""
    }
    const onSubmit = (values) => {
        console.log(values);
    }
    const validationSchema = Yup.object({
        code: Yup.string().required("Required")
    })
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })
    return (
        <div className="forgotPassword">
            <p>Enter the secret access code to join the project</p>
            <div className="forgotPassword__field">
                <CustomTextField
                    label="Access Code"
                    name="code"
                    value={formik.values.name}
                    handleChange={formik.handleChange}
                    error={Boolean(formik.touched.code && formik.errors.code)}
                    helperText={formik.errors.code}
                />
            </div>
            <CustomButton
                label="Join Project"
                onPress={formik.handleSubmit}
            />
        </div>
    )
}

export default AddProject
