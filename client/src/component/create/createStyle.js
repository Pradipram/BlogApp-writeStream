import styled from "@emotion/styled";
import { Box, FormControl, InputBase, TextareaAutosize } from "@mui/material";


// export const Container = styled(Box)(({ theme }) => ({
//     margin: '50px 100px',
//     [theme.breakpoints.down('md')]: {
//         margin: 0
//     }
// }));

export const Container = styled(Box)`
    margin: 50px 100px;
`

export const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

export const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;

export const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;

export const Textarea = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    margin-top: 50px;
    font-size: 18px;
    &:focus-visible {
        outline: none;
    }
`;