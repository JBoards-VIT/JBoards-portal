import { createTheme } from '@mui/material/styles';
let ChipTheme = createTheme({
    palette: {
        primary: {
            main: '#142d4c',
        },
        success: {
            main: "#75cfb8"
        },
        secondary: {
            main: "#385170"
        },
        warning: {
            main: "#9fa2a6"
        },
        info: {
            main: "#f1f8fa"
        }

    },
});

export default ChipTheme;