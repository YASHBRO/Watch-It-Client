import { createTheme } from "@mui/material/styles";
import { red, orange } from "@mui/material/colors";

export const AppTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: red[800],
        },
        secondary: {
            main: orange[600],
        },
    },
});
