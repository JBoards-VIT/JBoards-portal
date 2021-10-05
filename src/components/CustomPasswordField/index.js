import React, { useState } from 'react'
import { IconButton, TextField } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ThemeProvider } from '@mui/private-theming'
import TextFieldTheme from '../../themes/TextFieldTheme'
const CustomPasswordField = ({ label, name, value, handleChange, error, helperText }) => {
    const [showText, setShowText] = useState(false)
    const handleClick = () => {
        setShowText(!showText)
    }
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
                type={showText ? "text" : "password"}
                error={error}
                helperText={helperText ? helperText : " "}
                InputProps={{
                    endAdornment: <IconButton onClick={handleClick}>
                        {showText ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>,
                    sx: {
                        "& .MuiSvgIcon-root:hover": {
                            color: "#75cfb8"
                        }
                    }
                }}
                sx={{
                    "& .MuiInputLabel-root.Mui-focused": {
                        color: "#75cfb8"
                    },
                }}
            />
        </ThemeProvider>
    )
}

export default CustomPasswordField
