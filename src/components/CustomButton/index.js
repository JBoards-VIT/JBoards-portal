import { Button, ThemeProvider } from '@mui/material'
import React from 'react'
import "./style.scss"
import ButtonTheme from "../../themes/ButtonTheme"
const CustomButton = ({ onPress, label }) => {
    return (
        <ThemeProvider theme={ButtonTheme}>
            <div className="custom_button" onClick={onPress}>
                <Button
                    fullWidth={true}
                    size="large"
                    variant="outlined"
                    sx={{
                        "& .MuiButton-sizeLarge": {
                            height: 50,
                            fontWeight: 800,
                        },
                        "& .MuiSvgIcon-root:hover": {
                            color: "primary.main"
                        },
                    }}
                >
                    {label}
                </Button>
            </div>
        </ThemeProvider>
    )
}

export default CustomButton