import React from 'react'
import { TextField } from '@mui/material'
import { ThemeProvider } from '@mui/private-theming'
import TextFieldTheme from '../../themes/TextFieldTheme'
const CustomTextField = ({ label, name, value, handleChange, error, helperText, type = "text" }) => {
    return (
        <ThemeProvider theme={TextFieldTheme}>
            <TextField
                variant="outlined"
                placeholder={`Enter ${label}`}
                label={label}
                name={name}
                value={value}
                onChange={handleChange}
                fullWidth={true}
                type={type}
                error={error}
                helperText={helperText ? helperText : " "}
                sx={{
                    "& .MuiInputLabel-root.Mui-focused": {
                        color: "#75cfb8"
                    },
                }}
            />
        </ThemeProvider>
    )
}

export default CustomTextField
