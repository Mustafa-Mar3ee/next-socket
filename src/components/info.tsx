import React from 'react';
import { Box, Typography } from '@mui/material';

interface InfoBoxProps {
    title: string;
    value: React.ReactNode; // React.ReactNode allows for the value to be a string, a number, JSX, or even another component like <CurrentTime />
}

const InfoBox: React.FC<InfoBoxProps> = ({ title, value }) => {
    return (
        <Box
            sx={{
                backgroundImage: 'linear-gradient(45deg, #14181e, #1f2531)',
                py: 1.5,
                px: 2,
                borderRadius: 3,
                borderWidth: 1,
                borderColor: '#2b303a',
                borderStyle: 'solid',
                textAlign: 'center',
                marginBottom: 2, // Adds space between this component and anything below it
            }}
        >

            <Typography fontWeight="600" color="#fff">
                {value}
            </Typography>
        </Box>
    );
};

export default InfoBox;