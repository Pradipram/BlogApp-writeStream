import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";


export const Image = styled(Box)`
    width: 100%;
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position:relative;
`;

export const Heading = styled(Typography)`
    font-size: 70px;
    color: #FFFFFF;
    line-height: 1;
    background-color: black;
`;

export const SubHeading = styled(Typography)`
    font-size: 20px;
    background: #FFFFFF;
`;