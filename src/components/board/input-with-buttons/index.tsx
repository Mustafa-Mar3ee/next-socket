import React, { useContext } from 'react';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BoardContext from '@/contexts/boardContext'; // Adjust the path according to your structure
import PreferanceContext from '@/contexts/preferancesContext';

const InputWithButtons = ({ name, amount, title }) => {

    const { state, dispatch } = useContext(BoardContext);
    const { state: loader } = useContext(PreferanceContext)

    const currentPlayer = state.players.find(player => player.id === 5)

    const handleIncrement = () => {
        dispatch({
            type: 'updatePlayer',
            payload: {
                id: 5,
                updates: {
                    [name]: name === "multiplier" ? (parseFloat(currentPlayer[name]) + amount).toFixed(2) : currentPlayer[name] + amount
                }
            }
        });
    };

    const handleDecrement = () => {
        dispatch({
            type: 'updatePlayer',
            payload: {
                id: 5,
                updates: {
                    [name]: name === "multiplier" ? (parseFloat(currentPlayer[name]) - amount).toFixed(2) : currentPlayer[name] - amount
                }
            }
        });
    };

    return (
        <Box borderRadius={2} sx={{
            backgroundImage: 'linear-gradient(45deg, #14181e, #1f2531)',
            borderWidth: 1, borderColor: '#2b303a', borderStyle: 'solid'
        }} >

            <Typography
                fontSize='600'
                textAlign='center' variant='subtitle2' color='#7b8499'>
                {title}
            </Typography>
            <Box
                display={'flex'} alignItems={'center'} justifyContent={'space-around'}
            >
                <IconButton
                    size='small' disabled={loader?.isLoading} onClick={handleIncrement} aria-label="increment">
                    <ArrowDropUpIcon
                        fontSize='large'
                        sx={{
                            backgroundColor: '#1d232d',
                            borderRadius: 2,
                            color: "#fff",
                            border: 'solid 1px #343743',
                        }} />
                </IconButton>
                <TextField
                    size='small'
                    InputLabelProps={{ shrink: true }}
                    id="outlined-basic"
                    disabled={loader?.isLoading}
                    type='text'

                    sx={{
                        color: 'white',
                        "& .MuiInputBase-input": {
                            backgroundColor: "#14181e", borderRadius: 2.5
                        },

                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderWidth: 0,
                            },
                        },


                        input: { color: '#fff', textAlign: "center" }
                    }}
                    value={currentPlayer[name]}
                    onChange={(e) => {
                        const newValue = parseFloat(e.target.value);
                        dispatch({ type: 'set', name, amount: isNaN(newValue) ? 0 : newValue });
                    }}
                />
                <IconButton size='small' disabled={loader?.isLoading} onClick={handleDecrement} aria-label="decrement">
                    <ArrowDropDownIcon
                        fontSize='large'
                        sx={{
                            backgroundColor: '#1d232d',
                            borderRadius: 2,
                            color: "#fff",
                            border: 'solid 1px #343743'
                        }} />
                </IconButton>
            </Box>
        </Box>
    );
};

export default InputWithButtons;
