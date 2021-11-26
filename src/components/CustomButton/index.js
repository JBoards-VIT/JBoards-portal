import { Button, ThemeProvider } from '@mui/material'
import React from 'react'
import "./style.scss"
import ButtonTheme from "../../themes/ButtonTheme"
const CustomButton = ({ onPress, label, variant = "outlined" }) => {
    return (
        <ThemeProvider theme={ButtonTheme}>
            <div className="custom_button" onClick={onPress}>
                <Button
                    fullWidth={true}
                    size="large"
                    variant={variant}
                    sx={{
                        "& .MuiSvgIcon-root:hover": {
                            color: "primary.main"
                        },
                        color: variant === "outlined" ? "primary.main" : "#fff",
                    }}
                >
                    {label}
                </Button>
            </div>
        </ThemeProvider>
    )
}

export default CustomButton
