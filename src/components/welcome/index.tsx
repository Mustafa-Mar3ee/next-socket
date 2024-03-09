import { Box, Button, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import Paper from '@mui/material/Paper';
import BoardContext from '@/contexts/boardContext';

const Welcome = () => {
    const { state, dispatch } = useContext(BoardContext)
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!name.trim() || name.length < 3) {
            setNameError('Name must be at least 3 characters long.');
            return; // Stop the form submission if validation fails
        }
        dispatch({
            type: 'createPlayer',
            payload: {
                id: 5,
                name: name,
                points: 100,
                multiplier: 1,
                totalPoints: 1000
            }
        });
    };

    const handleNameChange = (event: any) => {
        setName(event.target.value);
    };

    return (
        <Grid container display={'flex'} spacing={2} height={'60vh'}>
            <Grid item component={Paper} alignItems={'center'} elevation={6} square>
                <Box
                    sx={{
                        height: 'auto',

                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: "space-between"
                    }}
                >
                    <Typography>Welcome</Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <Typography textAlign={'center'}>Please Insert your name</Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            autoFocus
                            value={name}
                            onChange={handleNameChange}
                            error={!!nameError}
                            helperText={nameError}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Accept
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Welcome;
